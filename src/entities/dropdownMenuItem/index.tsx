import {ReactNode} from "react";
import "./styles.scss";

interface DropdownMenuItemProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const DropdownMenuItem = ({leftIcon, rightIcon, children, onClick, disabled}: DropdownMenuItemProps) => {
    return (
        <li className={`dropdown-menu__item ${disabled ? "dropdown-menu__item_disabled" : " "}`}
            onClick={() => onClick && !disabled && onClick()}
        >
            {leftIcon && <span className="dropdown-menu__left-icon">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="dropdown-menu__right-icon">{rightIcon}</span>}
        </li>
    )
};

export default DropdownMenuItem;