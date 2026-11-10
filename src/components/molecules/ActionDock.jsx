import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    BookmarkSimple,
    Broom,
    Check,
    Sparkle,
} from "@phosphor-icons/react";

const SWEEP_OPTIONS = [
    { id: "seen", label: "Everything I scrolled past" },
    { id: 24, label: "Older than 24 hours" },
    { id: 8, label: "Older than 8 hours" },
    { id: 1, label: "Older than 1 hour" },
    { id: "all", label: "Everything", isDanger: true },
];

const DockButton = ({ icon: Icon, label, isPrimary, isBusy, weight = "regular", ...rest }) => (
    <button
        type="button"
        className={classNames("nw-dock__btn", { "nw-dock__btn--primary": isPrimary, "is-busy": isBusy })}
        {...rest}>
        <Icon size={20} weight={weight} />
        <span>{label}</span>
    </button>
);

DockButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    isPrimary: PropTypes.bool,
    isBusy: PropTypes.bool,
    weight: PropTypes.string,
};

const SweepMenu = ({ counts, onSweep }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const onPointerDown = (event) => {
            if (!wrapRef.current?.contains(event.target)) setIsOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="nw-sweep" ref={wrapRef}>
            {isOpen &&
                <div className="nw-menu" role="menu" aria-label="Mark as read">
                    <p className="nw-menu__title">Mark as read</p>
                    {SWEEP_OPTIONS.map((option) => {
                        const count = counts[option.id] || 0;
                        return (
                            <button
                                key={option.id}
                                type="button"
                                role="menuitem"
                                className={classNames("nw-menu__item", { "is-danger": option.isDanger })}
                                disabled={count === 0}
                                onClick={() => {
                                    setIsOpen(false);
                                    onSweep(option.id);
                                }}>
                                <span>{option.label}</span>
                                <span className="nw-menu__count">{count}</span>
                            </button>
                        );
                    })}
                </div>}
            <DockButton
                icon={Broom}
                label="Sweep"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)} />
        </div>
    );
};

SweepMenu.propTypes = {
    counts: PropTypes.object.isRequired,
    onSweep: PropTypes.func.isRequired,
};

export const ActionDock = ({
    view,
    hasItems,
    isBriefing,
    onBrief,
    sweepCounts,
    onSweep,
    onPrev,
    onNext,
    canPrev,
    canNext,
    onSave,
    onDone,
}) => {
    if (view === "saved" || !hasItems) return null;

    const brief = (
        <DockButton
            icon={Sparkle}
            label={isBriefing ? "Briefing" : "Brief"}
            weight={isBriefing ? "fill" : "regular"}
            isBusy={isBriefing}
            disabled={isBriefing}
            onClick={onBrief} />
    );

    return (
        <div className="nw-dock" role="toolbar" aria-label="Feed actions">
            {view === "page" ? (
                <>
                    <DockButton icon={ArrowLeft} label="Back" onClick={onPrev} disabled={!canPrev} />
                    {brief}
                    <DockButton icon={Check} label="Done" weight="bold" isPrimary onClick={onDone} />
                    <DockButton icon={BookmarkSimple} label="Save" onClick={onSave} />
                    <DockButton icon={ArrowRight} label="Skip" onClick={onNext} disabled={!canNext} />
                </>
            ) : (
                <>
                    {brief}
                    <SweepMenu counts={sweepCounts} onSweep={onSweep} />
                    <DockButton
                        icon={ArrowUp}
                        label="Top"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
                </>
            )}
        </div>
    );
};

ActionDock.propTypes = {
    view: PropTypes.string.isRequired,
    hasItems: PropTypes.bool,
    isBriefing: PropTypes.bool,
    onBrief: PropTypes.func.isRequired,
    sweepCounts: PropTypes.object.isRequired,
    onSweep: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    canPrev: PropTypes.bool,
    canNext: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
};
