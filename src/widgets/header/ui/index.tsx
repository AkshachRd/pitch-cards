import ColorPicker from "features/colorPicker";
import {useAppDispatch, useAppSelector} from "shared/hooks";
import {add, changeFilter, editColor, selectCanvasState} from "../../canvas/model/canvasSlice";
import {ArtObject, CanvasObjectTypes, Filters, Shapes} from "../../../shared/types";
import Menu from "../../../features/menu";
import {IconNames} from "../../../shared/icons";

const useCreateRect = () => {
    return {
        id: "" + Date.now(),
        type: CanvasObjectTypes.ArtObject,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        color: "green",
        shape: Shapes.Rectangle
    };
};

const useCreateTriangle = () => {
    return {
        id: "" + Date.now(),
        type: CanvasObjectTypes.ArtObject,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        color: "green",
        shape: Shapes.Triangle
    };
};

const useCreateCircle = () => {
    return {
        id: "" + Date.now(),
        type: CanvasObjectTypes.ArtObject,
        x: 25,
        y: 25,
        width: 50,
        height: 50,
        color: "green",
        shape: Shapes.Circle
    };
};

const Header = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(selectCanvasState);
    const rect = useCreateRect();
    const triangle = useCreateTriangle();
    const circle = useCreateCircle();
    const menuItems = [
        {
            iconName: IconNames.Rect,
            title: "Art Objects",
            dropdownButtons: [
                {iconName: IconNames.Rect, color: "green", action: () => dispatch(add(rect))},
                {iconName: IconNames.Triangle, color: "green", action: () => dispatch(add(triangle))},
                {iconName: IconNames.Circle, color: "green", action: () => dispatch(add(circle))},
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

    let currObj: ArtObject | null = null;
    let color = "#000000";
    if (state.currentObjectIndex !== null)
    {
        currObj = state.objects[state.currentObjectIndex] as ArtObject;
        color = currObj.color;
    }

    return (
        <>
            <ColorPicker
                disabled={!!currObj && currObj.type !== CanvasObjectTypes.ArtObject}
                value={color}
                action={(color) => dispatch(editColor(color))}
            />
            <Menu menuItems={menuItems}/>
        </>
    )
}

export default Header;