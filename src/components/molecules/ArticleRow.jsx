import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ArrowUpRight, BookmarkSimple, Check } from "@phosphor-icons/react";
import { formatAge, isRtl } from "../../utils.js";
import { useSwipeAction } from "../../hooks/useSwipeAction.js";

const LEAVE_MS = 220;

export const itemShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string,
    feedName: PropTypes.string,
    diff: PropTypes.object,
    date: PropTypes.string,
});

export const ArticleMeta = ({ item, children }) => {
    const age = formatAge(item.diff);
    return (
        <div className="nw-meta">
            <span className="nw-meta__source">{item.feedName}</span>
            {age && <time className="nw-meta__age" dateTime={item.date}>{age}</time>}
            {children}
        </div>
    );
};

ArticleMeta.propTypes = {
    item: itemShape.isRequired,
    children: PropTypes.node,
};

export const ArticleRow = ({ item, index = 0, isSeen = false, onDone, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const rtl = isRtl(item.title);

    const leaveThen = (callback) => {
        if (isLeaving) return;
        setIsLeaving(true);
        setTimeout(() => callback(item), LEAVE_MS);
    };

    const swipe = useSwipeAction({
        onSwipeLeft: () => leaveThen(onDone),
        onSwipeRight: () => leaveThen(onSave),
        disabled: isLeaving,
    });

    return (
        <li
            className={classNames("nw-row", {
                "is-seen": isSeen && !isOpen,
                "is-open": isOpen,
                "is-leaving": isLeaving,
                "is-swiping": swipe.side !== null,
                "is-dragging": swipe.isDragging,
            })}
            data-link={item.link}
            dir={rtl ? "rtl" : "ltr"}
            style={{ "--nw-i": Math.min(index, 10) }}>
            <div
                className="nw-row__clip"
                ref={swipe.rowRef}
                {...swipe.handlers}>
                {swipe.side &&
                    <div
                        className={classNames("nw-swipe", `nw-swipe--${swipe.side}`, {
                            "is-armed": swipe.isArmed,
                        })}
                        dir="ltr"
                        aria-hidden="true">
                        {swipe.side === "right"
                            ? <span className="nw-swipe__action">
                                <BookmarkSimple size={22} weight={swipe.isArmed ? "fill" : "bold"} />
                                <span>Save</span>
                            </span>
                            : <span className="nw-swipe__action">
                                <span>Read</span>
                                <Check size={22} weight="bold" />
                            </span>}
                    </div>}
                <article className="nw-row__pad" ref={swipe.contentRef}>
                    <ArticleMeta item={item}>
                        <span className="nw-row__quick">
                            <button
                                type="button"
                                className="nw-icon-btn nw-icon-btn--sm"
                                onClick={() => leaveThen(onSave)}
                                aria-label={`Save for later: ${item.title}`}
                                title="Save for later">
                                <BookmarkSimple size={17} />
                            </button>
                            <button
                                type="button"
                                className="nw-icon-btn nw-icon-btn--sm"
                                onClick={() => leaveThen(onDone)}
                                aria-label={`Mark as read: ${item.title}`}
                                title="Mark as read">
                                <Check size={17} weight="bold" />
                            </button>
                        </span>
                    </ArticleMeta>
                    <h2 className={classNames("nw-headline", { "nw-headline--he": rtl })}>
                        <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}>
                            {item.title}
                        </button>
                    </h2>
                    {isOpen &&
                        <div className="nw-row__body">
                            {item.description && <p className="nw-deck">{item.description}</p>}
                            <a
                                className="nw-read-link"
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer">
                                Read at {item.feedName}
                                <ArrowUpRight size={14} weight="bold" />
                            </a>
                        </div>}
                </article>
            </div>
        </li>
    );
};

ArticleRow.propTypes = {
    item: itemShape.isRequired,
    index: PropTypes.number,
    isSeen: PropTypes.bool,
    onDone: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
