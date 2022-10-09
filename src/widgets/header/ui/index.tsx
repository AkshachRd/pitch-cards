import ColorPicker from "features/colorPicker";
import {useAppDispatch} from "shared/hooks";
import {add, changeFilter, editColor} from "../../canvas/model/canvasSlice";
import {Filters} from "shared/types";
import Menu from "features/menu";
import {IconNames} from "shared/icons";
import {v4 as uuid4v} from "uuid";
import {createCircle, createRect, createTriangle} from "shared/lib/canvas";

const Header = () => {
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

    let color = "#000000";

    return (
        <>
            <ColorPicker
                disabled={false}
                value={color}
                action={(color) => dispatch(editColor(color))}
            />
            <Menu menuItems={menuItems}/>
        </>
    )
}

export default Header;