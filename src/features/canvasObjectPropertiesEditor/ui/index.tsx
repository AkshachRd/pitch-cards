import {CanvasObject} from "shared/types";
import DragNumInput from "entities/dragNumInput";
import {useEffect, useState} from "react";
import {useAppDispatch} from "shared/hooks";
import {editCoordsById, resizeObject} from "widgets/canvas/model/canvasSlice";
import ArtObjectPropertiesEditor from "./artObjectPropertiesEditor";
import TextObjectPropertiesEditor from "./textObjectPropertiesEditor";
import {isArtObject, isTextObject} from "shared/lib";

interface CanvasObjectPropertiesEditorProps
{
    selectedObj: CanvasObject;
}

const CanvasObjectPropertiesEditor = ({selectedObj}: CanvasObjectPropertiesEditorProps) => {
    const dispatch = useAppDispatch();

    const {x, y, width, height, id} = selectedObj;

    const [coords, setCoords] = useState({x, y});
    const [size, setSize] = useState({width, height});

    useEffect(() => {
        dispatch(editCoordsById({id, x: coords.x, y: coords.y}));
    }, [coords, dispatch, id]);

    useEffect(() => {
        dispatch(resizeObject({id, width: size.width, height: size.height}))
    }, [size, dispatch, id]);

    const getOtherCanvasObjectProperties = (obj: CanvasObject) => {
        if (isArtObject(obj))
        {
            return <ArtObjectPropertiesEditor artObj={obj}/>;
        }
        else if (isTextObject(obj))
        {
            return <TextObjectPropertiesEditor textObj={obj}/>;
        }
    };

    return (
        <div>
            <p>{selectedObj.type}</p>
            <DragNumInput
                name="X"
                minValue={0}
                value={x}
                onChange={(newX) => setCoords({x: newX, y})}
            />
            <DragNumInput
                name="Y"
                minValue={0}
                value={y}
                onChange={(newY) => setCoords({x, y: newY})}
            />
            <DragNumInput
                name="Width"
                minValue={1}
                value={width}
                onChange={(newWidth) => setSize({width: newWidth, height})}
            />
            <DragNumInput
                name="Height"
                minValue={1}
                value={height}
                onChange={(newHeight) => setSize({width, height: newHeight})}
            />

            {getOtherCanvasObjectProperties(selectedObj)}
        </div>
    );
};

export default CanvasObjectPropertiesEditor;