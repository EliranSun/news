import classNames from "classnames";

export const ColorButton = ({ color, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex justify-center items-center rounded-full p-2">
            <div className={classNames("size-4", {
                "bg-transparent": color === 'clear',
                "bg-black": color === 'black',
                "bg-red-500": color === 'red',
                "bg-green-500": color === 'green',
                "bg-blue-500": color === 'blue',
                "bg-yellow-500": color === 'yellow',
                "bg-purple-500": color === 'purple',
                "bg-orange-500": color === 'orange',
                "bg-pink-500": color === 'pink',
            })} />
        </button>
    );
};
