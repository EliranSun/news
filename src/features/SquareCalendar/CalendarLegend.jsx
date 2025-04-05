import classNames from "classnames";
import { getColorsClassList } from "./utils";
import PropTypes from "prop-types";

export const CalendarLegend = ({ isActive, legend = [] }) => {
    if (!isActive || !legend) return null;

    return (
        <legend className="flex flex-wrap gap-2">
            {legend.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                    <div className={classNames(getColorsClassList(item.color), {
                        "size-4 rounded-md": true,
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

