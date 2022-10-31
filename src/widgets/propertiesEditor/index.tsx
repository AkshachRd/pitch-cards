import CanvasObjectPropertiesEditor from "features/canvasObjectPropertiesEditor/ui";
import {useAppSelector} from "shared/hooks";
import {selectCanvasObjects} from "../canvas/model/canvasSlice";

const PropertiesEditor = () => {
    const objs = useAppSelector(selectCanvasObjects);
    const selectedObj = objs.filter((obj) => obj.selected)[0];
    return <CanvasObjectPropertiesEditor selectedObj={selectedObj}/>
};

export default PropertiesEditor;