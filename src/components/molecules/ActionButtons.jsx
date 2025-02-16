import { RoundButton } from "../atoms/RoundButton.jsx";
import { BookmarkSimple, Broom, CheckFat, Robot, Skull, Brain, MagnifyingGlass } from "@phosphor-icons/react";
import { NotificationBadge } from "../atoms/NotificationBadge.jsx";
import { ClearFeedUpToDate } from "./ClearFeedUpToDate.jsx";
import PropTypes from "prop-types";
import { useState } from "react";

let savedStorageItems = [];
try {
    savedStorageItems = JSON.parse(localStorage.getItem("saved-links") || "[]");
} catch (error) {
    console.error(error);
}

export const ActionButtons = ({
    contextualItems,
    setFeeds,
    setQueryResult,
    isSweepDataView,
    setIsSweepDataView,
    onQueryClick,
    aiQueryStatus = {},
    unreadItemsCount = 0,
}) => {
    const [savedLinks, setSavedLinks] = useState(savedStorageItems || []);
    const AIQueryIcon = aiQueryStatus.isError ? Skull : aiQueryStatus.isLoading ? Brain : Robot;

    return (
        <div className="fixed bottom-0 pt-4 pb-8
         border-gray-200 bg-white dark:bg-black inset-x-0 flex justify-center items-center 
         gap-4">
            {/* <RoundButton big onClick={() => window.open(contextualItems[0].link, "_blank")}>
                <Link size={24} />
            </RoundButton> */}
            <RoundButton big onClick={onQueryClick}>
                <AIQueryIcon size={24} className={aiQueryStatus.isLoading ? "animate-pulse" : ""} />
            </RoundButton>
            <RoundButton big
                onClick={() => {
                    const newSavedItems = [...savedLinks].concat(contextualItems[0]);
                    localStorage.setItem("saved-links", JSON.stringify(newSavedItems));
                    localStorage.setItem(contextualItems[0].link, "read");

                    setSavedLinks(newSavedItems);
                    setFeeds(contextualItems.filter((feed) => feed.link !== contextualItems[0].link));
                    setQueryResult("");
                }}>
                <BookmarkSimple size={24} />
                <NotificationBadge count={savedLinks.length} />
            </RoundButton>
            <RoundButton
                big
                onClick={() => {
                    localStorage.setItem(contextualItems[0].link, "read");
                    setFeeds(contextualItems.filter((feed) => feed.link !== contextualItems[0].link));
                    setQueryResult("");
                }}>
                <CheckFat size={24} />
                <NotificationBadge count={unreadItemsCount} />
            </RoundButton>
            <RoundButton big>
                <MagnifyingGlass size={24} />
            </RoundButton>
            <RoundButton big onClick={() => setIsSweepDataView(!isSweepDataView)}>
                <ClearFeedUpToDate
                    items={contextualItems}
                    isActive={isSweepDataView} />
                <Broom size={24} />
            </RoundButton>
        </div>
    );
};

ActionButtons.propTypes = {
    contextualItems: PropTypes.array,
    setFeeds: PropTypes.func,
    setQueryResult: PropTypes.func,
    isSweepDataView: PropTypes.bool,
    setIsSweepDataView: PropTypes.func,
    onQueryClick: PropTypes.func,
    aiQueryStatus: PropTypes.object,
    unreadItemsCount: PropTypes.number,
};
