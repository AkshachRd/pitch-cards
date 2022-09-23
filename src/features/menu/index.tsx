import MenuItem, {MenuItemDesc} from "entities/menuItem";
import "./styles.css";

interface MenuProps
{
    menuItems: Array<MenuItemDesc>;
}

const Menu = ({menuItems}: MenuProps) => {
    return (
        <ul className="menu">
            {menuItems.map((item, index) => (
                <MenuItem item={item} key={index}/>
            ))}
        </ul>
    )
}

export default Menu;