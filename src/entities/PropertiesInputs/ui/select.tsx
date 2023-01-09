import {ReactNode, SelectHTMLAttributes} from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    children: ReactNode;
};

const Select = ({name, children, className, defaultValue, value, ...props}: SelectProps) => {
    return (
        <div className="select__container">
            {name && <span className="select__name">{name}</span>}
            <select
                className={`select__element ${className}`}
                name={name}
                {...props}
            >
                {children}
            </select>
        </div>
    )
};

export default Select;