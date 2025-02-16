import classNames from "classnames";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const useCurrentItemScroll = (items = [], onItemsScroll = () => { }) => {
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items, currentIndex]);

    return { currentItem, currentIndex };
}

const Item = ({ item, index, currentIndex }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    return (
        <p
                    dir={item.language === "he" ? "rtl" : "ltr"}
                    onClick={() => {
                        if (isDescriptionOpen)
                            window.open(item.link, "_blank");
                        else 
                            setIsDescriptionOpen(true);
                    }}
                    className={classNames("py-4 item", {
                        "opacity-20": index < currentIndex,
                        "merriweather-regular": item.language !== "he",
                        "heebo-500": item.language === "he"
                    })}>
                    {item.title}{isDescriptionOpen? `: ${item.description}` : ""}
                </p>
                );
};

export default function ContinuousFeedView({ items = [], onItemsScroll = () => { } }) {
    const { currentItem, currentIndex } = useCurrentItemScroll(items, onItemsScroll);

    return (
        <div className="pt-24 pb-[50rem] px-4 text-xl">
            <span className="text-sm font-bold 
            bg-black text-white fixed left-1 top-16 p-2">
                {currentItem?.diff?.value}{currentItem?.diff?.unit} ago
            </span>
            {/* <span className="text-sm font-bold border-b-2 border-black 
            fixed top-20 bg-white p-4">
                {JSON.stringify({ currentIndex }, null, 2)}
            </span> */}
            {items.map((item, index) => <Item 
                item={item}
                index={index}
                currentIndex={currentIndex}
                key={item.title} />)}
        </div >
    );
}

ContinuousFeedView.propTypes = {
    items: PropTypes.array,
    onItemsScroll: PropTypes.func,
};