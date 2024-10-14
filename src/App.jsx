import { useState } from "react";
import { useRssFeed } from "./hooks/useRssFeed.js";
import { View } from "./components/organisms/View.jsx";
import { ActionButtons } from "./components/molecules/ActionButtons.jsx";
import { PageNavigationHeader } from "./components/molecules/PageNavigationHeader.jsx";
import { useQueryAI } from "./hooks/useQueryAI.js";


const RssFeedComponent = () => {
    const [isSavedView, setIsSavedView] = useState(false);
    const [isSweepDataView, setIsSweepDataView] = useState(false);
    const { items, setFeeds } = useRssFeed(isSavedView);
    const { queryResult, onQueryClick, setQueryResult } = useQueryAI(items);
    
    return (
        <section className="p-5 h-[100dvh] w-screen">
            <PageNavigationHeader
                isSavedView={isSavedView}
                setIsSavedView={setIsSavedView}/>
            <View
                queryResult={queryResult}
                items={items}
                isSavedView={isSavedView}/>
            <ActionButtons
                contextualItems={items}
                setFeeds={setFeeds}
                setQueryResult={setQueryResult}
                isSweepDataView={isSweepDataView}
                setIsSweepDataView={setIsSweepDataView}
                onQueryClick={onQueryClick}/>
        </section>
    );
};

export default RssFeedComponent;
