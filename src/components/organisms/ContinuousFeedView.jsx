import classNames from "classnames";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

const useCurrentItemScroll = (elementRef, items = [], onItemsScroll = () => { }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentItem, setCurrentItem] = useState(items[0]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            let cumulativeHeight = 0;
            let newCurrentIndex = 0;

            const itemsElements = document.querySelectorAll('.item');
            for (let i = 0; i < itemsElements.length; i++) {
                cumulativeHeight += itemsElements[i].offsetHeight;
                if (scrollPosition < cumulativeHeight) {
                    newCurrentIndex = i;
                    break;
                }
            }

            localStorage.setItem(currentItem.link, "read");

            if (newCurrentIndex >= currentIndex) {
                setCurrentIndex(newCurrentIndex);
            }

            setCurrentItem(items[newCurrentIndex]);
            onItemsScroll(currentItem.link);
        };

        elementRef.current.addEventListener('scroll', handleScroll);
        return () => elementRef.current.removeEventListener('scroll', handleScroll);
    }, [items, currentIndex]);

    return { currentItem, currentIndex };
}

function hasHebrewCharacters(text) {
    return /[\u0590-\u05FF]/.test(text);
}

const Item = ({ item, index, currentIndex }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const isHebrew = hasHebrewCharacters(item.title);

    return (
        <p
            dir={isHebrew ? "rtl" : "ltr"}
            onClick={() => {
                if (isDescriptionOpen)
                    window.open(item.link, "_blank");
                else
                    setIsDescriptionOpen(true);
            }}
            className={classNames("py-4 text-lg", {
                "opacity-20": index < currentIndex,
                "merriweather-regular": !isHebrew,
                "heebo-500": isHebrew
            })}>
            {item.title}{isDescriptionOpen ? `: ${item.description}` : ""}
        </p>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        description: PropTypes.string,
        diff: PropTypes.shape({
            value: PropTypes.number,
            unit: PropTypes.string,
        }),
        isSaved: PropTypes.bool,
        feedName: PropTypes.string,
    }),
    index: PropTypes.number,
    currentIndex: PropTypes.number,
};

export default function ContinuousFeedView({ items = [], onItemsScroll = () => { } }) {
    const elementRef = useRef(null);
    const { currentItem, currentIndex } = useCurrentItemScroll(elementRef, items, onItemsScroll);

    return (
        <div
            ref={elementRef}
            id="continuous-feed-view"
            className="py-16 px-4 h-[70vh] border overflow-y-auto">
            <span className="text-sm font-extrabold bg-black text-white fixed left-1 top-16 p-2">
                {currentItem?.diff?.value}{currentItem?.diff?.unit} ago
            </span>
            {items.map((item, index) => <Item
                item={item}
                index={index}
                currentIndex={currentIndex}
                key={item.title} />)}
        </div >
    );
}

ContinuousFeedView.propTypes = {
    onItemsScroll: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            description: PropTypes.string,
            diff: PropTypes.shape({
                value: PropTypes.number,
                unit: PropTypes.string,
            }),
            isSaved: PropTypes.bool,
            feedName: PropTypes.string,
        })
    ),
};