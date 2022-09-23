import MenuButton from "../menuButton";
import Icon, {IconNames} from "shared/icons";
import Dropdown, {DropdownButton} from "../dropdown";
import {useReducer} from "react";
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
    const dropdownButtons = item.dropdownButtons.map((button) => {
        return {...button, action: () => {
                button.action();
                toggleDropdown();
            }}
    });

    return (
        <div>
            <li className={"menu-item"}>
                <MenuButton title={item.title} onClick={() => toggleDropdown()}>
                    <Icon width={50} height={50} color={"gray"} name={item.iconName}/>
                </MenuButton>
                <Dropdown disabled={dropdown} buttons={dropdownButtons}/>
            </li>
        </div>
    )
}

export default MenuItem;