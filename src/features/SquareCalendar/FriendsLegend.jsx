import classNames from "classnames";
import { Calendars } from "./constants";
import { getColorsClassList } from "./utils";

export const FriendsLegend = ({ isActive }) => {
    if (!isActive) return null;

    return (
        <legend className="flex flex-wrap gap-2">
            {Calendars.Friends.legend.map((friend) => (
                <div key={friend.name} className="flex items-center gap-2">
                    <div className={classNames(getColorsClassList(friend.color), {
                        "size-4 rounded-md": true,
                    })} />
                    <span>{friend.name}</span>
                </div>
            ))}
        </legend>
    );
};