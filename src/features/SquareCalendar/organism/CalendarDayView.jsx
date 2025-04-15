import classNames from "classnames";
import { getColorsClassList } from "../utils";
import PropTypes from "prop-types";
import { format } from "date-fns";
export const CalendarDayView = ({ data }) => {
    console.log({ data });

    return (
        <div className="flex flex-col gap-1 h-[80vh] w-screen overflow-y-auto pb-20">
            {data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item) => {
                const day = format(item.date, "E");
                const dayNumber = format(item.date, "dd");
                const month = format(item.date, "MMM");
                return (
                    <div className={classNames({
                        "flex gap-4 items-center bg-gray-50 odd:bg-gray-100": true,
                        "rounded-lg px-4 py-1": true,
                        "mb-4": day === "Sat",
                    })} key={item.date}>
                        <div className={classNames(getColorsClassList(item.color), {
                            "size-4 rounded": true,
                        })} />
                        <div>{dayNumber} {month} {day}</div>
                        <div>{item.note}</div>
                    </div>
                );
            })}
        </div>
    )
};

CalendarDayView.propTypes = {
    data: PropTypes.array.isRequired,
};