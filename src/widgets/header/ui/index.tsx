import {ReactNode} from "react";
import "./styles.scss";
import DropdownMenuBar from "features/dropdownMenuBar";

interface HeaderProps
{
    children?: ReactNode;
}

const Header = ({children}: HeaderProps) => {
    return (
        <div className="header">
            <DropdownMenuBar/>
            {children}
        </div>
    )
}

export default Header;