import { ColorButton } from "../atoms/ColorButton";
import PropTypes from "prop-types";
export const ColorsButtons = ({ calendar, onColorSelect }) => {
    return (
        <div className="flex overflow-x-auto gap-0.5">
            {calendar.colors.map(color =>
                <ColorButton
                    key={color}
                    color={color}
                    legend={calendar.legend?.find(item => item.color === color)}
                    onClick={() => onColorSelect(color)}
                />
            )}
            <ColorButton color="⬜️" onClick={() => onColorSelect('clear')} />
        </div>
    )
}

ColorsButtons.propTypes = {
    calendar: PropTypes.object.isRequired,
    onColorSelect: PropTypes.func.isRequired
}

