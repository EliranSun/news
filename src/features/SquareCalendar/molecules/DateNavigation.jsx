import { DateNavigationButton } from "../atoms/DateNavigationButton";

export const DateNavigation = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="grid grid-cols-3 gap-2 max-w-[150px] my-2 border rounded-lg p-2">
            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
            <DateNavigationButton direction="↑" currentDate={selectedDate} onClick={setSelectedDate} />
            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
            <DateNavigationButton direction="←" currentDate={selectedDate} onClick={setSelectedDate} />
            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-50"></div>
            <DateNavigationButton direction="→" currentDate={selectedDate} onClick={setSelectedDate} />
            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
            <DateNavigationButton direction="↓" currentDate={selectedDate} onClick={setSelectedDate} />
            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
        </div>
    )
}
