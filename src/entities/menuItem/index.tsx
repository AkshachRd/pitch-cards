import MenuButton from "../menuButton";
import Icon, {IconNames} from "shared/icons";
import Dropdown, {DropdownButton} from "../dropdown";
import {useEffect, useReducer, useRef} from "react";
import "./styles.css";

export interface MenuItemDesc
{
    iconName: IconNames;
    title: string;
    dropdownButtons: Array<DropdownButton>;
}

interface MenuItemProps
{
    item: MenuItemDesc;
}

const MenuItem = ({item}: MenuItemProps) => {
    const [dropdown, toggleDropdown] = useReducer((state) => !state, true);
    const itemRef = useRef<HTMLLIElement>(null);
    const dropdownButtons = item.dropdownButtons.map((button) => {
        return {...button, action: () => {
                button.action();
                toggleDropdown();
            }}
    });

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
                <Dropdown disabled={dropdown} buttons={dropdownButtons}/>
            </li>
        </div>
    )
}

export default MenuItem;