import {ReactNode, useEffect, useRef, useState} from "react";
import "./styles.css";

interface DropdownMenuProps {
    title: string;
    children?: ReactNode;
}

const DropdownMenu = ({title, children}: DropdownMenuProps) => {
    const [isClosed, setIsClosed] = useState(true);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const dropdownMenuTitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
             if (!isClosed && dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target as Node))
             {
                 setIsClosed(true);
             }
        };

        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    });

    return (
        <div
            className="dropdown-menu"
            ref={dropdownMenuRef}
            onMouseEnter={() => setIsClosed(false)}
            onMouseLeave={() => setIsClosed(true)}
        >
            <div className="dropdown-menu__title" ref={dropdownMenuTitleRef}>{title}</div>
            {!isClosed &&
                <ul className="dropdown-menu__list">
                    {children}
                </ul>
            }
        </div>
    )
};

export default DropdownMenu;