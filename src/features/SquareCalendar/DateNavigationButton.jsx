import { subDays, addDays } from "date-fns";


export const DateNavigationButton = ({ direction, currentDate, onClick }) => {
    return (
        <button
            className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            onClick={() => {
                let newDate = currentDate;
                switch (direction) {
                    case '⬆️':
                        newDate = subDays(currentDate, 7);
                        break;
                    case '⬇️':
                        newDate = addDays(currentDate, 7);
                        break;
                    case '⬅️':
                        newDate = subDays(currentDate, 1);
                        break;
                    case '➡️':
                        newDate = addDays(currentDate, 1);
                        break;
                }

                onClick(newDate);
            }}>
            {direction}
        </button>
    );
};
