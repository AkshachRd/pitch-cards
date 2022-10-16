import MenuButton from "../menuButton";
import Icon, {IconNames} from "shared/icons";
import Dropdown from "../dropdown";
import {useEffect, useReducer, useRef, ReactNode} from "react";
import "./styles.css";

export interface MenuItemDesc
{
    iconName: IconNames;
    title: string;
}

interface MenuItemProps
{
    item: MenuItemDesc;
    children?: ReactNode;
}

const MenuItem = ({item, children}: MenuItemProps) => {
    const [dropdown, toggleDropdown] = useReducer((state) => !state, true);
    const itemRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (!itemRef.current) throw new Error("itemRef is not assigned");
        const handler = (event: MouseEvent | TouchEvent) => {
            if (!dropdown && itemRef.current && !itemRef.current.contains(event.target as Node)) {
                toggleDropdown();
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown])

    return (
        <div>
            <li className={"menu-item"} ref={itemRef}>
                <MenuButton title={item.title} onClick={() => toggleDropdown()}>
                    <Icon width={50} height={50} color={"gray"} name={item.iconName}/>
                </MenuButton>
                <Dropdown disabled={dropdown}>
                    {children}
                </Dropdown>
            </li>
        </div>
    )
}

export default MenuItem;