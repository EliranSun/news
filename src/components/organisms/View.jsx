import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
    ArrowUpRight,
    ArrowsDownUp,
    BookmarkSimple,
    Check,
    Trash,
    X,
} from "@phosphor-icons/react";
import { ArticleMeta, ArticleRow, itemShape } from "../molecules/ArticleRow.jsx";
import { getAgeGroup, isRtl } from "../../utils.js";

// Height of the sticky bar; rows that scroll up behind it count as seen.
const BAR_HEIGHT = 52;

const Skeleton = () => (
    <div className="nw-skeleton" aria-busy="true">
        <span className="nw-visually-hidden">Loading the latest stories</span>
        {[88, 64, 94, 72, 81, 58].map((width, index) => (
            <div className="nw-skeleton__row" key={index} style={{ "--nw-i": index }}>
                <span className="nw-skel nw-skel--meta" />
                <span className="nw-skel nw-skel--title" style={{ width: `${width}%` }} />
                <span className="nw-skel nw-skel--title" style={{ width: `${width - 30}%` }} />
            </div>
        ))}
    </div>
);

const EmptyState = ({ kicker, title, children }) => (
    <div className="nw-empty">
        {kicker && <p className="nw-empty__kicker">{kicker}</p>}
        <h2 className="nw-empty__title">{title}</h2>
        <div className="nw-empty__body">{children}</div>
    </div>
);

EmptyState.propTypes = {
    kicker: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

const FeedList = ({ items, seen, onSeen, onDone, onSave }) => {
    const listRef = useRef(null);
    const onSeenRef = useRef(onSeen);
    onSeenRef.current = onSeen;

    useEffect(() => {
        const list = listRef.current;
        if (!list || typeof IntersectionObserver === "undefined") return undefined;

        const observer = new IntersectionObserver((entries) => {
            const passed = entries
                .filter((entry) => !entry.isIntersecting && entry.boundingClientRect.bottom <= BAR_HEIGHT + 1)
                .map((entry) => entry.target.dataset.link)
                .filter(Boolean);
            if (passed.length > 0) onSeenRef.current(passed);
        }, { rootMargin: `-${BAR_HEIGHT}px 0px 0px 0px` });

        list.querySelectorAll("[data-link]").forEach((row) => observer.observe(row));
        return () => observer.disconnect();
    }, [items]);

    const groups = useMemo(() => {
        const result = [];
        items.forEach((item, index) => {
            const label = getAgeGroup(item.diff);
            const last = result[result.length - 1];
            if (last && last.label === label) last.entries.push({ item, index });
            else result.push({ label, entries: [{ item, index }] });
        });
        return result;
    }, [items]);

    return (
        <div ref={listRef}>
            {groups.map((group, groupIndex) => (
                <section key={`${group.label}-${groupIndex}`} className="nw-group">
                    <h3 className="nw-group__label">
                        <span>{group.label}</span>
                        <span className="nw-group__count">{group.entries.length}</span>
                    </h3>
                    <ul className="nw-list">
                        {group.entries.map(({ item, index }) => (
                            <ArticleRow
                                key={item.link}
                                item={item}
                                index={index}
                                isSeen={seen.has(item.link)}
                                onDone={onDone}
                                onSave={onSave} />
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
};

FeedList.propTypes = {
    items: PropTypes.arrayOf(itemShape).isRequired,
    seen: PropTypes.instanceOf(Set).isRequired,
    onSeen: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

const FocusView = ({ item, position, total }) => {
    const rtl = isRtl(item.title);

    return (
        <article className="nw-focus" key={item.link} dir={rtl ? "rtl" : "ltr"}>
            <div className="nw-focus__progress" dir="ltr">
                <span>{position} of {total}</span>
                <span className="nw-focus__track">
                    <span style={{ width: `${(position / total) * 100}%` }} />
                </span>
            </div>
            <ArticleMeta item={item} />
            <h2 className={classNames("nw-focus__title", { "nw-headline--he": rtl })}>
                {item.title}
            </h2>
            {item.description &&
                <p className="nw-focus__deck" dir={isRtl(item.description) ? "rtl" : "ltr"}>
                    {item.description}
                </p>}
            <a
                className="nw-read-link nw-read-link--lg"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr">
                <span>Read the full story at <bdi>{item.feedName}</bdi></span>
                <ArrowUpRight size={16} weight="bold" />
            </a>
        </article>
    );
};

FocusView.propTypes = {
    item: itemShape.isRequired,
    position: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

const SourcesView = ({ items, onPickSource, onDoneMany }) => {
    const sources = useMemo(() => {
        const bySource = new Map();
        items.forEach((item) => {
            bySource.set(item.feedName, [...(bySource.get(item.feedName) || []), item]);
        });
        return [...bySource.entries()]
            .map(([name, entries]) => ({
                name,
                // Newest first inside a source, whatever the feed order is.
                entries: [...entries].sort((a, b) => a.diff.diffTime - b.diff.diffTime),
            }))
            .sort((a, b) => b.entries.length - a.entries.length || a.name.localeCompare(b.name));
    }, [items]);

    return (
        <div className="nw-sources">
            {sources.map(({ name, entries }, index) => (
                <section className="nw-source" key={name} style={{ "--nw-i": Math.min(index, 10) }}>
                    <header className="nw-source__head">
                        <button
                            type="button"
                            className="nw-source__name"
                            onClick={() => onPickSource(name)}>
                            <span dir="auto">{name}</span>
                            <span className="nw-source__count">{entries.length}</span>
                        </button>
                        <button
                            type="button"
                            className="nw-text-btn"
                            onClick={() => onDoneMany(entries, `Marked ${entries.length} from ${name} as read`)}>
                            <Check size={14} weight="bold" />
                            Mark all read
                        </button>
                    </header>
                    <ol className="nw-source__list">
                        {entries.slice(0, 3).map((item) => (
                            <li key={item.link} dir={isRtl(item.title) ? "rtl" : "ltr"}>
                                <a
                                    className={classNames("nw-source__link", { "nw-headline--he": isRtl(item.title) })}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                    {entries.length > 3 &&
                        <button
                            type="button"
                            className="nw-text-btn nw-source__more"
                            onClick={() => onPickSource(name)}>
                            {entries.length - 3} more from {name}
                        </button>}
                </section>
            ))}
        </div>
    );
};

SourcesView.propTypes = {
    items: PropTypes.arrayOf(itemShape).isRequired,
    onPickSource: PropTypes.func.isRequired,
    onDoneMany: PropTypes.func.isRequired,
};

const SavedView = ({ saved, onUnsave }) => (
    <ul className="nw-list nw-list--saved">
        {saved.map((item) => {
            const rtl = isRtl(item.title || "");
            return (
                <li className="nw-row" key={item.link} dir={rtl ? "rtl" : "ltr"}>
                    <div className="nw-row__clip">
                        <article className="nw-row__pad">
                            <div className="nw-meta">
                                <span className="nw-meta__source">{item.feedName}</span>
                                <span className="nw-row__quick">
                                    <button
                                        type="button"
                                        className="nw-icon-btn nw-icon-btn--sm"
                                        onClick={() => onUnsave(item)}
                                        aria-label={`Remove from saved: ${item.title}`}
                                        title="Remove from saved">
                                        <Trash size={17} />
                                    </button>
                                </span>
                            </div>
                            <h2 className={classNames("nw-headline", { "nw-headline--he": rtl })}>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </h2>
                        </article>
                    </div>
                </li>
            );
        })}
    </ul>
);

SavedView.propTypes = {
    saved: PropTypes.array.isRequired,
    onUnsave: PropTypes.func.isRequired,
};

export const View = ({
    view,
    status,
    items,
    totalCount,
    unreadCount,
    seen,
    onSeen,
    onDone,
    onSave,
    onDoneMany,
    focusIndex,
    sort,
    onToggleSort,
    query,
    onClearQuery,
    source,
    onClearSource,
    onPickSource,
    saved,
    savedTotal,
    onUnsave,
    onRefresh,
    pendingCount,
    onMergePending,
}) => {
    if (view === "saved") {
        if (savedTotal > 0 && saved.length === 0) {
            return (
                <EmptyState kicker="No matches" title="Nothing saved fits that search">
                    <button type="button" className="nw-btn" onClick={onClearQuery}>Clear search</button>
                </EmptyState>
            );
        }
        if (saved.length === 0) {
            return (
                <EmptyState kicker="Saved" title="Nothing put aside yet">
                    <p>
                        Swipe a story right, or tap <BookmarkSimple size={15} weight="bold" className="nw-inline-icon" />,
                        to keep it here for later.
                    </p>
                </EmptyState>
            );
        }
        return (
            <>
                <div className="nw-status">
                    <span>
                        {saved.length !== savedTotal && `${saved.length} of `}
                        {savedTotal} saved {savedTotal === 1 ? "story" : "stories"}
                    </span>
                </div>
                <SavedView saved={saved} onUnsave={onUnsave} />
            </>
        );
    }

    if (status === "loading") return <Skeleton />;

    if (status === "error") {
        return (
            <EmptyState kicker="Off the wire" title="The feed did not load">
                <p>Check your connection and try again.</p>
                <button type="button" className="nw-btn" onClick={onRefresh}>Try again</button>
            </EmptyState>
        );
    }

    const newStories = pendingCount > 0 && (
        <button type="button" className="nw-new" onClick={onMergePending}>
            {pendingCount} new {pendingCount === 1 ? "story" : "stories"}
        </button>
    );

    if (totalCount === 0) {
        return (
            <>
                {newStories}
                <EmptyState kicker="All caught up" title="That is everything for now">
                    <p>New stories are checked for every five minutes.</p>
                    <button type="button" className="nw-btn" onClick={onRefresh}>Check now</button>
                </EmptyState>
            </>
        );
    }

    const filters = (source || query) && (
        <div className="nw-filters">
            {source &&
                <button type="button" className="nw-chip" onClick={onClearSource}>
                    <span dir="auto">{source}</span>
                    <X size={12} weight="bold" aria-label="Clear source filter" />
                </button>}
            {query &&
                <button type="button" className="nw-chip" onClick={onClearQuery}>
                    <span dir="auto">“{query}”</span>
                    <X size={12} weight="bold" aria-label="Clear search" />
                </button>}
        </div>
    );

    if (items.length === 0) {
        return (
            <>
                {filters}
                <EmptyState kicker="No matches" title="Nothing fits that filter">
                    <p>Try a different search, or clear the filters above.</p>
                </EmptyState>
            </>
        );
    }

    if (view === "page") {
        const index = Math.min(focusIndex, items.length - 1);
        return (
            <>
                {filters}
                <FocusView item={items[index]} position={index + 1} total={items.length} />
            </>
        );
    }

    if (view === "feeds") {
        return (
            <>
                {newStories}
                {filters}
                <div className="nw-status">
                    <span>{items.length} unread across {new Set(items.map((item) => item.feedName)).size} sources</span>
                </div>
                <SourcesView items={items} onPickSource={onPickSource} onDoneMany={onDoneMany} />
            </>
        );
    }

    return (
        <>
            {newStories}
            {filters}
            <div className="nw-status">
                <span>
                    <strong>{unreadCount}</strong> unread
                    {unreadCount !== items.length && ` of ${items.length}`}
                </span>
                <button type="button" className="nw-text-btn" onClick={onToggleSort}>
                    <ArrowsDownUp size={14} weight="bold" />
                    {sort === "oldest" ? "Oldest first" : "Newest first"}
                </button>
            </div>
            <FeedList
                items={items}
                seen={seen}
                onSeen={onSeen}
                onDone={onDone}
                onSave={onSave} />
            <p className="nw-end">End of the feed</p>
        </>
    );
};

View.propTypes = {
    view: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    unreadCount: PropTypes.number.isRequired,
    seen: PropTypes.instanceOf(Set).isRequired,
    onSeen: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDoneMany: PropTypes.func.isRequired,
    focusIndex: PropTypes.number.isRequired,
    sort: PropTypes.string.isRequired,
    onToggleSort: PropTypes.func.isRequired,
    query: PropTypes.string,
    onClearQuery: PropTypes.func.isRequired,
    source: PropTypes.string,
    onClearSource: PropTypes.func.isRequired,
    onPickSource: PropTypes.func.isRequired,
    saved: PropTypes.array.isRequired,
    savedTotal: PropTypes.number.isRequired,
    onUnsave: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    pendingCount: PropTypes.number,
    onMergePending: PropTypes.func.isRequired,
};
