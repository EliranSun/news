import { useMemo } from "react";
import { Categories } from "../constants";

export const CategoryStrip = ({ onCategoryClick }) => {
    return (
        <div className="flex flex-row gap-2 w-full overflow-x-auto">
            {Object.values(Categories).map((category) => (
                <button key={category} onClick={() => onCategoryClick(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
};
