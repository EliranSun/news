import { RoundButton } from "../atoms/RoundButton.jsx";
import { BookmarkSimple, Broom, CheckFat, Link, Robot, Skull, Brain } from "@phosphor-icons/react";
import { NotificationBadge } from "../atoms/NotificationBadge.jsx";
import { ClearFeedUpToDate } from "./ClearFeedUpToDate.jsx";
import PropTypes from "prop-types";

export const ActionButtons = ({
    contextualItems,
    setFeeds,
    setQueryResult,
    isSweepDataView,
    setIsSweepDataView,
    onQueryClick,
    aiQueryStatus = {}
}) => {
    const AIQueryIcon = aiQueryStatus.isError ? Skull : aiQueryStatus.isLoading ? Brain : Robot;

    return (
        <div className="fixed bottom-0 pt-4 pb-8
         border-gray-200 bg-white dark:bg-slate-800 inset-x-0 flex justify-center items-center 
         gap-4">
            <RoundButton big onClick={() => window.open(contextualItems[0].link, "_blank")}>
                <Link size={24} />
            </RoundButton>
            <RoundButton big onClick={onQueryClick}>
                <AIQueryIcon size={24} className={aiQueryStatus.isLoading ? "animate-pulse" : ""} />
            </RoundButton>
            <RoundButton
                big
                onClick={() => {
                    localStorage.setItem(contextualItems[0].link, "read");
                    setFeeds(contextualItems.filter((feed) => feed.link !== contextualItems[0].link));
                    setQueryResult("");
                }}>
                <CheckFat size={24} />
                <NotificationBadge count={contextualItems.length} />
            </RoundButton>
            <RoundButton big
                onClick={() => {
                    localStorage.setItem(contextualItems[0].link, "saved");
                    setFeeds(contextualItems.filter((feed) => feed.link !== contextualItems[0].link));
                    setQueryResult("");
                }}>
                <BookmarkSimple size={24} />
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
};
