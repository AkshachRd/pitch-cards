import {ReactNode} from "react";
import "./styles.css";

interface MenuButtonProps
{
    title: string;
    onClick?: () => void;
    children?: ReactNode;
}

const MenuButton = ({title, onClick, children}: MenuButtonProps) => {
    return (
        <button className={"menu-button"} onClick={onClick}>
            {children}
            <span>{title}</span>
        </button>
    )
}

export default MenuButton;