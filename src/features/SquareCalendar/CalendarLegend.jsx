import classNames from "classnames";
import { getColorsClassList } from "./utils";
import PropTypes from "prop-types";

export const CalendarLegend = ({ isActive, legend = [] }) => {
    if (!isActive || !legend) return null;

    return (
        <legend className="w-full flex flex-wrap gap-2">
            {legend.map((item) => (
                <div key={item.name} className="flex items-center text-xs gap-2">
                    <div className={classNames(getColorsClassList(item.color), {
                        "size-2 rounded-md": true,
                    })} />
                    <span>{item.name}</span>
                </div>
            ))}
        </legend>
    );
};

CalendarLegend.propTypes = {
    isActive: PropTypes.bool.isRequired,
    legend: PropTypes.array.isRequired,
};

