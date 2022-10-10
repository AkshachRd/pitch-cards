interface ColorPickerProps
{
    disabled: boolean;
    value: string;
    action: (color: string) => void;
}

const ColorPicker = ({disabled, value, action}: ColorPickerProps) => {
    return (
        <input
            disabled={disabled}
            id={"head"}
            type="color"
            value={value}
            onChange={(e) => {
                action(e.target.value);
            }}
        />
    )
}

export default ColorPicker;