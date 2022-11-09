import ColorPicker from "entities/colorPicker";
import {useEffect, useState} from "react";
import {ArtObject} from "shared/types";
import {changeColor} from "widgets/canvas/model/canvasObjectsSlice";
import {useAppDispatch} from "shared/hooks";

interface ArtObjectPropertiesEditorProps
{
    artObj: ArtObject;
}

const ArtObjectPropertiesEditor = ({artObj}: ArtObjectPropertiesEditorProps) => {
    const dispatch = useAppDispatch();

    const [color, setColor] = useState(artObj.color);

    const id = artObj.id;

    useEffect(() => {
        dispatch(changeColor({id, color}))
    }, [color]);

    return (
        <ColorPicker name="artObjectColor" onChange={(color) => setColor(color)}/>
    );
};

export default ArtObjectPropertiesEditor;