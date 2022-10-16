import {ReactNode} from "react";
import "./styles.css";

interface MenuProps
{
    children?: ReactNode;
}

const Menu = ({children}: MenuProps) => {
    return (
        <ul className="menu">
            {children}
        </ul>
    )
}

export default Menu;