import classNames from "classnames";
import { Calendars } from "./constants";
import { getColorsClassList } from "./utils";
export const FriendsLegend = ({ isActive }) => {
    if (!isActive) return null;

    return (
        <legend>
            {Calendars.Friends.legend.map((friend) => (
                <div key={friend.name} className="flex items-center gap-2">
                    <div className={classNames({
                        "size-4 rounded-md": true,
                        ...getColorsClassList(friend.color),
                    })} />
                    <span>{friend.name}</span>
                </div>
            ))}
        </legend>
    );
};