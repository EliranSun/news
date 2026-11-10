import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ArrowsClockwise, MagnifyingGlass, X } from "@phosphor-icons/react";

const TABS = [
    { id: "feed", label: "Feed" },
    { id: "page", label: "Focus" },
    { id: "feeds", label: "Sources" },
    { id: "saved", label: "Saved" },
];

const formatUpdated = (date, now) => {
    if (!date) return "";
    const minutes = Math.floor((now - date.getTime()) / 60000);
    if (minutes < 1) return "Updated just now";
    if (minutes < 60) return `Updated ${minutes}m ago`;
    return `Updated ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export const Masthead = ({ lastUpdated, isRefreshing, onRefresh }) => {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 30 * 1000);
        return () => clearInterval(interval);
    }, []);

    const today = new Date(now).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="nw-masthead">
            <div className="nw-masthead__top">
                <a className="nw-masthead__home" href="/">Apps</a>
                <button
                    type="button"
                    className="nw-masthead__refresh"
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    aria-label="Refresh feed">
                    <span>{isRefreshing ? "Checking the wire" : formatUpdated(lastUpdated, now) || "Refresh"}</span>
                    <ArrowsClockwise
                        size={14}
                        weight="bold"
                        className={classNames({ "nw-spin": isRefreshing })} />
                </button>
            </div>
            <h1 className="nw-masthead__title">News</h1>
            <div className="nw-masthead__sub">
                <span>{today}</span>
                <span className="nw-masthead__tag">Up to date &amp; full of anxiety</span>
            </div>
        </header>
    );
};

Masthead.propTypes = {
    lastUpdated: PropTypes.instanceOf(Date),
    isRefreshing: PropTypes.bool,
    onRefresh: PropTypes.func.isRequired,
};

export const NewsBar = ({ view, setView, counts = {}, query, setQuery, searchRef }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const localRef = useRef(null);
    const inputRef = searchRef || localRef;
    const showSearch = isSearchOpen || query.length > 0;

    useEffect(() => {
        if (isSearchOpen) inputRef.current?.focus();
    }, [isSearchOpen, inputRef]);

    // Lets the "/" shortcut open the field from outside.
    useEffect(() => {
        const open = () => setIsSearchOpen(true);
        window.addEventListener("news:search", open);
        return () => window.removeEventListener("news:search", open);
    }, []);

    const closeSearch = () => {
        setQuery("");
        setIsSearchOpen(false);
    };

    return (
        <div className="nw-bar">
            <div className="nw-bar__inner">
                {showSearch ? (
                    <div className="nw-search">
                        <MagnifyingGlass size={18} aria-hidden="true" />
                        <input
                            ref={inputRef}
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Escape") closeSearch();
                            }}
                            placeholder="Search headlines and sources"
                            aria-label="Search headlines and sources"
                            dir="auto"
                            enterKeyHint="search" />
                        <button
                            type="button"
                            className="nw-icon-btn"
                            onClick={closeSearch}
                            aria-label="Close search">
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <>
                        <nav className="nw-tabs" aria-label="Views">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    className={classNames("nw-tab", { "is-active": view === tab.id })}
                                    aria-current={view === tab.id ? "page" : undefined}
                                    onClick={() => setView(tab.id)}>
                                    {tab.label}
                                    {counts[tab.id] > 0 &&
                                        <span className="nw-tab__count">{counts[tab.id]}</span>}
                                </button>
                            ))}
                        </nav>
                        <button
                            type="button"
                            className="nw-icon-btn"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Search">
                            <MagnifyingGlass size={18} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

NewsBar.propTypes = {
    view: PropTypes.string.isRequired,
    setView: PropTypes.func.isRequired,
    counts: PropTypes.object,
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
    searchRef: PropTypes.object,
};
