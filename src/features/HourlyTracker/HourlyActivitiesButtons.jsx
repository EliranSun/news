import { HourlyActivitiesMap } from "./constants";
import { contrastColor } from "../SquareCalendar/utils";
import classNames from "classnames";
import PropTypes from "prop-types";

export function HourlyActivitiesButtons({
    data,
    selectedDate,
    selectedHour,
    setData,
    setSelectedHour
}) {
    return (
        <div className="flex justify-start gap-2">
            {HourlyActivitiesMap.map((square) =>
                <button
                    key={square.id}
                    style={{
                        color: contrastColor({ bgColor: square.hex }),
                        // border: `1px solid ${square.hex}`
                    }}
                    className={classNames(square.color, {
                        "uppercase": true,
                        "size-10 text-xs flex items-center justify-center": true,
                    })}
                    onClick={() => {
                        setData({
                            ...data,
                            [selectedDate]: {
                                ...data[selectedDate],
                                [selectedHour]: square.id
                            }
                        });

                        setSelectedHour(selectedHour + 1);
                    }}>
                    {square.activity.slice(0, 3)}
                    {/* {square.icon} */}
                </button>)}
        </div>
    )
}

HourlyActivitiesButtons.propTypes = {
    data: PropTypes.object.isRequired,
    selectedDate: PropTypes.string.isRequired,
    selectedHour: PropTypes.number.isRequired,
    setData: PropTypes.func.isRequired,
    setSelectedHour: PropTypes.func.isRequired
};