
export const ColorButton = ({ color, onClick }) => {
    return (
        <button className="flex justify-center items-center bg-gray-200 rounded-full p-2" onClick={onClick}>{color}</button>
    );
};
