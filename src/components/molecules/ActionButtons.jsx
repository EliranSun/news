import { RoundButton } from "../atoms/RoundButton.jsx";
import { BookmarkSimple, Broom, CheckFat, Link, Robot } from "@phosphor-icons/react";
import { NotificationBadge } from "../atoms/NotificationBadge.jsx";
import { ClearFeedUpToDate } from "./ClearFeedUpToDate.jsx";

export const ActionButtons = ({
    contextualItems,
    setFeeds,
    setQueryResult,
    isSweepDataView,
    setIsSweepDataView,
    onQueryClick,
}) => {
    return (
        <div className="fixed bottom-8 inset-x-0 flex justify-center items-center gap-6">
            <RoundButton onClick={() => window.open(contextualItems[0].link, "_blank")}>
                <Link size={24}/>
            </RoundButton>
            <RoundButton onClick={onQueryClick}>
                <Robot size={24}/>
            </RoundButton>
            <RoundButton
                big
                onClick={() => {
                    localStorage.setItem(contextualItems[0].link, "read");
                    setFeeds(contextualItems.filter((feed) => feed.link !== contextualItems[0].link));
                    setQueryResult("");
                }}>
                <CheckFat size={24}/>
                <NotificationBadge count={contextualItems.length}/>
            </RoundButton>
            <RoundButton
                onClick={() => {
                    localStorage.setItem(contextualItems[0].link, "saved");
                    setFeeds(contextualItems.filter((feed) => feed.link !== contextualItems[0].link));
                    setQueryResult("");
                }}>
                <BookmarkSimple size={24}/>
            </RoundButton>
            <RoundButton onClick={() => setIsSweepDataView(!isSweepDataView)}>
                <ClearFeedUpToDate
                    items={contextualItems}
                    isActive={isSweepDataView}
                />
                <Broom size={24}/>
            </RoundButton>
        </div>
    );
};