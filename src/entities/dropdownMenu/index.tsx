import {forwardRef, ReactNode, Ref, useEffect, useRef, useState} from "react";
import "./styles.scss";

interface DropdownMenuProps {
    title: string;
    className?: string;
    children?: ReactNode;
}

const DropdownMenu = forwardRef(function DropdownMenu({title, className, children}: DropdownMenuProps, ref: Ref<HTMLDivElement>) {
    const [isClosed, setIsClosed] = useState(true);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    ref = dropdownMenuRef;
    const dropdownMenuTitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
             if (!isClosed && dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target as Node)) {
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
            className={`dropdown-menu ${className}`}
            ref={dropdownMenuRef}
            onMouseEnter={() => setIsClosed(false)}
        >
            <div className="dropdown-menu__title" ref={dropdownMenuTitleRef}>{title}</div>
            {!isClosed &&
                <div className="dropdown-menu__list">
                    <div
                        className="dropdown-menu__padding"
                        style={{width: dropdownMenuRef.current?.clientWidth}}
                        onMouseEnter={() => setIsClosed(false)}
                        onMouseLeave={() => setIsClosed(true)}
                    />
                    <ul className="dropdown-menu__inner-list"
                        onMouseEnter={() => setIsClosed(false)}
                        onMouseLeave={() => setIsClosed(true)}
                    >
                        {children}
                    </ul>
                </div>
            }
        </div>
    )
});

export default DropdownMenu;