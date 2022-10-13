import PopUp from "features/popUp";
import React, {useState} from "react";

interface SettingsProps
{
    toggle: () => void;
}

const Settings = ({toggle}: SettingsProps) => {
    const [width, setWidth] = useState(Number(process.env.REACT_APP_CANVAS_WIDTH));
    const [height, setHeight] = useState(Number(process.env.REACT_APP_CANVAS_HEIGHT));

    return (
        <PopUp
            onClose={() => toggle()}
        >
            <label>
                Width
                <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                />
            </label>
            <label>
                Height
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                />
            </label>
        </PopUp>
    )
};

export default Settings;