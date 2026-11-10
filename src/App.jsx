import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRssFeed } from "./hooks/useRssFeed.js";
import { useQueryAI } from "./hooks/useQueryAI.js";
import { useSavedItems } from "./hooks/useSavedItems.js";
import { View } from "./components/organisms/View.jsx";
import { ActionDock } from "./components/molecules/ActionDock.jsx";
import { BriefPanel } from "./components/molecules/BriefPanel.jsx";
import { Masthead, NewsBar } from "./components/molecules/NewsHeader.jsx";
import PhysicsDemo from "./features/SquareCalendar/organism/PhysicsDemo.jsx";
import { markRead, unmarkRead } from "./utils.js";
import "@fontsource-variable/noto-serif-hebrew";
import "@fontsource-variable/assistant";
import "./news.css";

const VIEWS = ["feed", "page", "feeds", "saved"];
const BRIEF_LIMIT = 30;
const TOAST_MS = 6000;
const HOUR = 60 * 60 * 1000;

const usePersistedState = (key, fallback, allowed) => {
	const [value, setValue] = useState(() => {
		try {
			const stored = localStorage.getItem(key);
			return stored && allowed.includes(stored) ? stored : fallback;
		} catch {
			return fallback;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, value);
		} catch (error) {
			console.error(error);
		}
	}, [key, value]);

	return [value, setValue];
};

const isTyping = (target) =>
	target instanceof HTMLElement &&
	(target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

const RssFeedComponent = () => {
	const [view, setViewState] = usePersistedState("news-view", "feed", VIEWS);
	const [sort, setSort] = usePersistedState("news-sort", "oldest", ["oldest", "newest"]);
	const [query, setQuery] = useState("");
	const [source, setSource] = useState(null);
	const [seen, setSeen] = useState(() => new Set());
	const [focusIndex, setFocusIndex] = useState(0);
	const [toast, setToast] = useState(null);
	const searchRef = useRef(null);

	const feed = useRssFeed();
	const { setItems } = feed;
	const { saved, save, unsave } = useSavedItems();
	const ai = useQueryAI();

	// The rest of the app styles <body> as a centered flex column on black;
	// this flag lets the news page own the page background while mounted.
	useEffect(() => {
		document.documentElement.classList.add("nw-root");
		return () => document.documentElement.classList.remove("nw-root");
	}, []);

	const items = useMemo(() => {
		const needle = query.trim().toLowerCase();
		const filtered = feed.items.filter((item) => {
			if (source && item.feedName !== source) return false;
			if (!needle) return true;
			return item.title.toLowerCase().includes(needle) ||
				item.feedName.toLowerCase().includes(needle) ||
				item.description.toLowerCase().includes(needle);
		});
		const direction = sort === "oldest" ? -1 : 1;
		return filtered.sort((a, b) => direction * (a.diff.diffTime - b.diff.diffTime));
	}, [feed.items, query, source, sort]);

	const unreadCount = useMemo(
		() => items.filter((item) => !seen.has(item.link)).length,
		[items, seen]
	);

	const currentIndex = Math.min(focusIndex, Math.max(items.length - 1, 0));
	const currentItem = items[currentIndex];

	const clearBrief = ai.clear;
	const setView = useCallback((next) => {
		setViewState(next);
		clearBrief();
		window.scrollTo({ top: 0 });
	}, [setViewState, clearBrief]);

	const visibleSaved = useMemo(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return saved;
		return saved.filter((item) =>
			`${item.title || ""} ${item.feedName || ""}`.toLowerCase().includes(needle));
	}, [saved, query]);

	const showToast = useCallback((message, undo) => {
		setToast({ id: Date.now(), message, undo });
	}, []);

	useEffect(() => {
		if (!toast) return undefined;
		const timeout = setTimeout(() => setToast(null), TOAST_MS);
		return () => clearTimeout(timeout);
	}, [toast]);

	const restore = useCallback((targets) => {
		targets.forEach((item) => unmarkRead(item.link));
		const links = new Set(targets.map((item) => item.link));
		setSeen((prev) => new Set([...prev].filter((link) => !links.has(link))));
		setItems((prev) => {
			const present = new Set(prev.map((item) => item.link));
			return [...prev, ...targets.filter((item) => !present.has(item.link))];
		});
	}, [setItems]);

	const dismiss = useCallback((targets, message) => {
		if (targets.length === 0) return;
		const links = new Set(targets.map((item) => item.link));
		targets.forEach((item) => markRead(item.link));
		setItems((prev) => prev.filter((item) => !links.has(item.link)));
		showToast(message, () => restore(targets));
	}, [setItems, showToast, restore]);

	const handleDone = useCallback((item) => {
		dismiss([item], "Marked as read");
	}, [dismiss]);

	const handleSave = useCallback((item) => {
		save(item);
		markRead(item.link);
		setItems((prev) => prev.filter((existing) => existing.link !== item.link));
		showToast("Saved for later", () => {
			unsave(item.link);
			restore([item]);
		});
	}, [save, unsave, setItems, showToast, restore]);

	const handleUnsave = useCallback((item) => {
		unsave(item.link);
		showToast("Removed from saved", () => save(item));
	}, [save, unsave, showToast]);

	const handleSeen = useCallback((links) => {
		links.forEach(markRead);
		setSeen((prev) => {
			if (links.every((link) => prev.has(link))) return prev;
			return new Set([...prev, ...links]);
		});
	}, []);

	const sweepTargets = useMemo(() => {
		const olderThan = (hours) => items.filter((item) => item.diff.diffTime >= hours * HOUR);
		return {
			seen: items.filter((item) => seen.has(item.link)),
			24: olderThan(24),
			8: olderThan(8),
			1: olderThan(1),
			all: items,
		};
	}, [items, seen]);

	const sweepCounts = useMemo(
		() => Object.fromEntries(Object.entries(sweepTargets).map(([id, list]) => [id, list.length])),
		[sweepTargets]
	);

	const handleSweep = useCallback((id) => {
		const targets = sweepTargets[id] || [];
		dismiss(targets, `Marked ${targets.length} ${targets.length === 1 ? "story" : "stories"} as read`);
	}, [sweepTargets, dismiss]);

	const askBrief = ai.ask;
	const handleBrief = useCallback(() => {
		const targets = view === "page" ? [currentItem].filter(Boolean) : items.slice(0, BRIEF_LIMIT);
		askBrief(targets);
		if (view !== "page") window.scrollTo({ top: 0, behavior: "smooth" });
	}, [askBrief, view, currentItem, items]);

	const pickSource = useCallback((name) => {
		setSource(name);
		setFocusIndex(0);
		setView("feed");
	}, [setView]);

	const goPrev = useCallback(() => setFocusIndex(Math.max(currentIndex - 1, 0)), [currentIndex]);
	const goNext = useCallback(
		() => setFocusIndex(Math.min(currentIndex + 1, Math.max(items.length - 1, 0))),
		[currentIndex, items.length]
	);

	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;

			if (event.key === "/") {
				event.preventDefault();
				window.dispatchEvent(new Event("news:search"));
				searchRef.current?.focus();
				return;
			}

			if (view !== "page" || !currentItem) return;

			switch (event.key) {
				case "ArrowRight":
				case "j":
					goNext();
					break;
				case "ArrowLeft":
				case "k":
					goPrev();
					break;
				case "d":
					handleDone(currentItem);
					break;
				case "s":
					handleSave(currentItem);
					break;
				case "o":
					window.open(currentItem.link, "_blank", "noopener");
					break;
				default:
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [view, currentItem, goNext, goPrev, handleDone, handleSave]);

	const hasItems = feed.status === "ready" && items.length > 0;
	const hasDock = view !== "saved" && hasItems;

	return (
		<div className="nw-app">
			<Masthead
				lastUpdated={feed.lastUpdated}
				isRefreshing={feed.isRefreshing}
				onRefresh={feed.refresh} />
			<NewsBar
				view={view}
				setView={setView}
				counts={{ feed: unreadCount, saved: saved.length }}
				query={query}
				setQuery={(value) => {
					setQuery(value);
					setFocusIndex(0);
				}}
				searchRef={searchRef} />
			<main className="nw-main">
				{view !== "saved" &&
					<BriefPanel
						status={ai.status}
						result={ai.result}
						onRetry={handleBrief}
						onClose={ai.clear} />}
				<View
					view={view}
					status={feed.status}
					items={items}
					totalCount={feed.items.length}
					unreadCount={unreadCount}
					seen={seen}
					onSeen={handleSeen}
					onDone={handleDone}
					onSave={handleSave}
					onDoneMany={dismiss}
					focusIndex={currentIndex}
					sort={sort}
					onToggleSort={() => setSort(sort === "oldest" ? "newest" : "oldest")}
					query={query.trim()}
					onClearQuery={() => setQuery("")}
					source={source}
					onClearSource={() => setSource(null)}
					onPickSource={pickSource}
					saved={visibleSaved}
					savedTotal={saved.length}
					onUnsave={handleUnsave}
					onRefresh={feed.refresh}
					pendingCount={feed.pending.length}
					onMergePending={feed.mergePending} />
			</main>
			<ActionDock
				view={view}
				hasItems={hasItems}
				isBriefing={ai.status === "loading"}
				onBrief={handleBrief}
				sweepCounts={sweepCounts}
				onSweep={handleSweep}
				onPrev={goPrev}
				onNext={goNext}
				canPrev={currentIndex > 0}
				canNext={currentIndex < items.length - 1}
				onSave={() => currentItem && handleSave(currentItem)}
				onDone={() => currentItem && handleDone(currentItem)} />
			{toast &&
				<div
					className={hasDock ? "nw-toast" : "nw-toast nw-toast--low"}
					role="status"
					key={toast.id}>
					<span>{toast.message}</span>
					{toast.undo &&
						<button
							type="button"
							className="nw-toast__undo"
							onClick={() => {
								toast.undo();
								setToast(null);
							}}>
							Undo
						</button>}
				</div>}
		</div>
	);
};

// Physics demo component wrapper
export const PhysicsDemoWrapper = () => {
	return <PhysicsDemo />;
};

export default RssFeedComponent;
