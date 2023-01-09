import {useEffect, useState} from "react";
import {ArtObject} from "shared/types";
import {changeColor} from "widgets/canvas/model/canvasObjectsSlice";
import {useAppDispatch} from "shared/hooks";
import ColorInput from "entities/PropertiesInputs/ui/colorInput";

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
        <>
            <ColorInput name="Color" value={color} onChange={(e) => setColor(e.target.value)}/>
        </>
    );
};

export default ArtObjectPropertiesEditor;