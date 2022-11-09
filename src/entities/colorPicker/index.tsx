interface ColorPickerProps
{
    disabled?: boolean;
    value?: string;
    name?: string;
    onChange?: (value: string) => void;
}

const ColorPicker = ({disabled, value = "#000", onChange, name}: ColorPickerProps) => {
    return (
        <input
            disabled={disabled}
            type="color"
            name={name}
            value={value}
            onChange={(e) => {
                onChange && onChange(e.target.value);
            }}
        />
    )
}

export default ColorPicker;