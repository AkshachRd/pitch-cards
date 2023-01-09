import {InputHTMLAttributes, forwardRef, Ref} from "react";
import "./styles.scss";

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const TextInput = forwardRef(function TextInput({name, className, ...props}: TextInputProps, ref: Ref<HTMLInputElement>) {
    return (
        <label className="text-input__label">
            <input
                className={`text-input__input ${className}`}
                type="text"
                ref={ref}
                name={name}
                {...props}
            />
            {name && <span className="text-input__name">{name}</span>}
        </label>
    )
});

export default TextInput;