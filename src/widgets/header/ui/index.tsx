import {ReactNode} from "react";
import {useAppDispatch} from "shared/hooks";
import {changeFilter} from "widgets/canvas/model/canvasSlice";
import {Filters} from "shared/types";
import Menu from "features/menu";
import Icon, {IconNames} from "shared/icons";
import {v4 as uuid4v} from "uuid";
import {createCircle, createRect, createTriangle} from "shared/lib/canvas";
import MenuItem from "entities/menuItem";
import TextEditor from "features/textEditor";
import "./styles.css";
import {add} from "widgets/canvas/model/canvasObjectsSlice";
import DropdownMenuBar from "../../../features/dropdownMenuBar";

interface HeaderProps
{
    children?: ReactNode;
}

const Header = ({children}: HeaderProps) => {
    const dispatch = useAppDispatch();
    const menuItems = [
        {
            iconName: IconNames.Rect,
            title: "Art Objects",
            dropdownButtons: [
                {iconName: IconNames.Rect, color: "green", action: () => dispatch(add(createRect(uuid4v())))},
                {iconName: IconNames.Triangle, color: "green", action: () => dispatch(add(createTriangle(uuid4v())))},
                {iconName: IconNames.Circle, color: "green", action: () => dispatch(add(createCircle(uuid4v())))},
            ]},
        {
            iconName: IconNames.Triangle,
            title: "Filters",
            dropdownButtons: [
                {iconName: IconNames.Rect, color: "white", action: () => dispatch(changeFilter(Filters.None))},
                {iconName: IconNames.Rect, color: Filters.Green, action: () => dispatch(changeFilter(Filters.Green))},
                {iconName: IconNames.Rect, color: Filters.Red, action: () => dispatch(changeFilter(Filters.Red))},
                {iconName: IconNames.Rect, color: Filters.Blue, action: () => dispatch(changeFilter(Filters.Blue))},
                {iconName: IconNames.Rect, color: Filters.Gray, action: () => dispatch(changeFilter(Filters.Gray))},

            ]}
    ];

    return (
        <div className="header">
            <Menu>
                {menuItems.map(({iconName, title, dropdownButtons}) => 
                    <MenuItem key={title} item={{iconName, title}}>
                        {dropdownButtons.map(({action, iconName, color}) => 
                            <button key={iconName + " " + color} onClick={action}>
                                <Icon name={iconName} color={color} width={50} height={50}/>
                            </button>
                        )}
                    </MenuItem>
                )}
                <MenuItem item={{iconName: IconNames.Circle, title: "Text"}}>
                    <TextEditor />
                </MenuItem>
            </Menu>
            <DropdownMenuBar/>
            {children}
        </div>
    )
}

export default Header;