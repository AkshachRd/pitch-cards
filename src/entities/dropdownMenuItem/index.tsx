import {ReactNode} from "react";
import "./styles.css";

interface DropdownMenuItemProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children?: ReactNode;
    onClick?: () => void;
}

const DropdownMenuItem = ({leftIcon, rightIcon, children, onClick}: DropdownMenuItemProps) => {
    return (
        <li className="dropdown-menu__item" onClick={() => onClick && onClick()}>
            <span>{leftIcon}</span>
            {children}
            <span>{rightIcon}</span>
        </li>
    )
};

export default DropdownMenuItem;