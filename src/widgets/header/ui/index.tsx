import ColorPicker from "features/colorPicker";
import {useAppDispatch, useAppSelector} from "shared/hooks";
import {add, changeFilter, editColor, selectCanvasState} from "../../canvas/model/canvasSlice";
import {ArtObject, CanvasObjectTypes, Filters, Shapes} from "../../../shared/types";

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
}

const Header = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(selectCanvasState);
    const rect = useCreateRect();

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
            <button onClick={() => dispatch(add(rect))}>Rect</button>
            <button onClick={() => dispatch(changeFilter(Filters.Green))}>Filter</button>
        </>
    )
}

export default Header;