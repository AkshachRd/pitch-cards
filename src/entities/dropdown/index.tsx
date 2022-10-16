import {ReactNode, Children} from "react";
import "./styles.css";

interface DropdownProps
{
    disabled?: boolean;
    children?: ReactNode;
}

const Dropdown = ({disabled = false, children}: DropdownProps) => {
    return (
        <div className={`dropdown ${disabled ? "" : "dropdown_show"}`}>
            {Children.map(children, (child) => 
                <div>{child}</div>
            )}
        </div>
    )
}

export default Dropdown;