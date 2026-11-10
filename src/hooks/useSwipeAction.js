import { useCallback, useEffect, useRef, useState } from "react";

// Distance before a drag counts as a horizontal swipe rather than a tap or scroll.
const LOCK_PX = 10;
// Fraction of the row width the drag must pass for release to apply the action.
const ARM_RATIO = 0.3;
const ARM_MIN_PX = 80;
const ARM_MAX_PX = 160;
// A quick flick applies the action even short of the arm distance.
const FLICK_SPEED = 0.6; // px per ms
const FLICK_MIN_PX = 48;
const SNAP_MS = 220;
const FLY_MS = 200;

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Gmail-style swipe on a row. The content element follows the finger and the
 * backdrop behind it reveals the action. Releasing past the arm distance flies
 * the content out and calls onSwipeLeft / onSwipeRight; otherwise it springs back.
 *
 * Directions are physical (screen left/right), regardless of text direction.
 */
export const useSwipeAction = ({ onSwipeLeft, onSwipeRight, disabled = false }) => {
    const contentRef = useRef(null);
    const rowRef = useRef(null);
    const drag = useRef(null);
    const suppressClick = useRef(false);
    const timers = useRef([]);
    const [side, setSide] = useState(null); // "left" | "right" | null
    const [isArmed, setIsArmed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const later = (fn, ms) => {
        timers.current.push(setTimeout(fn, ms));
    };

    const setOffset = useCallback((dx, transition) => {
        const content = contentRef.current;
        const row = rowRef.current;
        if (!content || !row) return;
        content.style.transition = transition || "none";
        content.style.transform = dx ? `translate3d(${dx}px, 0, 0)` : "";
        const width = row.offsetWidth || 1;
        row.style.setProperty("--nw-swipe", Math.min(Math.abs(dx) / width, 1).toFixed(3));
    }, []);

    const armDistance = () => {
        const width = rowRef.current?.offsetWidth || 360;
        return Math.min(Math.max(width * ARM_RATIO, ARM_MIN_PX), ARM_MAX_PX);
    };

    const reset = useCallback(() => {
        const reduced = prefersReducedMotion();
        setOffset(0, reduced ? "none" : `transform ${SNAP_MS}ms cubic-bezier(0.2, 0.9, 0.3, 1.2)`);
        setIsArmed(false);
        later(() => setSide(null), reduced ? 0 : SNAP_MS);
    }, [setOffset]);

    const commit = useCallback((direction) => {
        const width = rowRef.current?.offsetWidth || 400;
        const target = direction === "left" ? -width : width;
        const reduced = prefersReducedMotion();
        setOffset(target, reduced ? "none" : `transform ${FLY_MS}ms cubic-bezier(0.4, 0, 1, 1)`);
        if (navigator.vibrate) navigator.vibrate(8);
        later(() => {
            (direction === "left" ? onSwipeLeft : onSwipeRight)?.();
        }, reduced ? 0 : FLY_MS);
    }, [setOffset, onSwipeLeft, onSwipeRight]);

    const onPointerDown = (event) => {
        if (disabled || drag.current?.committed) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;
        drag.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            dx: 0,
            locked: false,
            abandoned: false,
            samples: [{ t: event.timeStamp, x: event.clientX }],
        };
    };

    const onPointerMove = (event) => {
        const d = drag.current;
        if (!d || d.id !== event.pointerId || d.abandoned || d.committed) return;

        const dx = event.clientX - d.x;
        const dy = event.clientY - d.y;

        if (!d.locked) {
            if (Math.abs(dy) > LOCK_PX && Math.abs(dy) > Math.abs(dx)) {
                d.abandoned = true;
                return;
            }
            if (Math.abs(dx) < LOCK_PX) return;
            d.locked = true;
            // Start from the lock point so the row does not jump.
            d.x = event.clientX - Math.sign(dx) * LOCK_PX;
            setIsDragging(true);
            try {
                event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
                // Pointer may already be gone.
            }
        }

        let offset = event.clientX - d.x;
        // Resist in directions with no action.
        if ((offset < 0 && !onSwipeLeft) || (offset > 0 && !onSwipeRight)) offset /= 4;
        d.dx = offset;
        d.samples.push({ t: event.timeStamp, x: event.clientX });
        if (d.samples.length > 5) d.samples.shift();

        const nextSide = offset < 0 ? "left" : offset > 0 ? "right" : null;
        const armed = Math.abs(offset) >= armDistance() &&
            ((nextSide === "left" && onSwipeLeft) || (nextSide === "right" && onSwipeRight));

        setOffset(offset);
        setSide(nextSide);
        setIsArmed((was) => {
            if (armed && !was && navigator.vibrate) navigator.vibrate(4);
            return Boolean(armed);
        });
    };

    const finish = (event, cancelled) => {
        const d = drag.current;
        if (!d || d.id !== event.pointerId) return;

        if (!d.locked) {
            drag.current = null;
            return;
        }

        setIsDragging(false);
        suppressClick.current = true;
        later(() => { suppressClick.current = false; }, 0);

        const first = d.samples[0];
        const last = d.samples[d.samples.length - 1];
        const velocity = (last.x - first.x) / Math.max(last.t - first.t, 1);
        const direction = d.dx < 0 ? "left" : "right";
        const hasAction = direction === "left" ? onSwipeLeft : onSwipeRight;
        const isFlick = Math.abs(velocity) > FLICK_SPEED &&
            Math.abs(d.dx) > FLICK_MIN_PX &&
            Math.sign(velocity) === Math.sign(d.dx);

        if (!cancelled && hasAction && (Math.abs(d.dx) >= armDistance() || isFlick)) {
            d.committed = true;
            setSide(direction);
            setIsArmed(true);
            commit(direction);
        } else {
            drag.current = null;
            reset();
        }
    };

    const onKeyDown = (event) => {
        if (event.key === "Escape" && drag.current?.locked) {
            drag.current = null;
            setIsDragging(false);
            reset();
        }
    };

    // Swallow the click that a pointerup fires after a drag.
    const onClickCapture = (event) => {
        if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return {
        rowRef,
        contentRef,
        side,
        isArmed,
        isDragging,
        handlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp: (event) => finish(event, false),
            onPointerCancel: (event) => finish(event, true),
            onClickCapture,
            onKeyDown,
        },
    };
};
