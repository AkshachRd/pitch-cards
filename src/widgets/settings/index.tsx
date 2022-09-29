import config from "config.json";
import PopUp from "features/popUp";
import React, {useState} from "react";

interface SettingsProps
{
    toggle: () => void;
}

const Settings = ({toggle}: SettingsProps) => {
    const [width, setWidth] = useState(config.canvas.objects.defaultWidth);
    const [height, setHeight] = useState(config.canvas.objects.defaultHeight);

    return (
        <PopUp
            submitAction={() => {
                config.canvas.objects.defaultWidth = width;
                config.canvas.objects.defaultHeight = height;
                toggle();
            }}
            submitValue={"Save"}
            cancelAction={() => toggle()}
            cancelValue={"Cancel"}>
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