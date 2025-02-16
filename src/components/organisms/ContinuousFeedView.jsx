import classNames from "classnames";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const useCurrentItemScroll = (items = []) => {
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
            currentIndex < newCurrentIndex && setCurrentIndex(newCurrentIndex);
            setCurrentItem(items[newCurrentIndex]);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items]);

    return { currentItem, currentIndex };
}

export default function ContinuousFeedView({ items = [] }) {
    const { currentItem, currentIndex } = useCurrentItemScroll(items);

    return (
        <div className="pt-24 pb-72 px-4 text-xl">
            <span className="text-sm font-bold 
            bg-black text-white fixed left-1 top-16 p-2">
                {currentItem?.diff?.value}{currentItem?.diff?.unit} ago
            </span>
            {/* <span className="text-sm font-bold border-b-2 border-black 
            fixed top-20 bg-white p-4">
                {JSON.stringify({ currentIndex }, null, 2)}
            </span> */}
            {items.map((item, index) =>
                <p
                    key={item.id}
                    dir={item.language === "he" ? "rtl" : "ltr"}
                    onClick={() => {
                        window.open(item.link, "_blank");
                    }}
                    className={classNames("py-4 item", {
                        "opacity-20": index < currentIndex,
                        "merriweather-regular": item.language !== "he",
                        "heebo-500": item.language === "he"
                    })}>
                    {item.title}
                </p>)
            }
        </div >
    );
}

ContinuousFeedView.propTypes = {
    items: PropTypes.array,
};