import {InputHTMLAttributes} from "react";

type ColorInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const ColorInput = ({name, className, ...props}: ColorInputProps) => {
    return (
        <label className="color-input__label">
            <input
                className={`color-input__input ${className}`}
                type="color"
                name={name}
                {...props}
            />
            {name && <span className="color-input__name">{name}</span>}
        </label>
    )
};

export default ColorInput;