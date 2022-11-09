import CanvasObjectPropertiesEditor from "features/canvasObjectPropertiesEditor/ui";
import {useAppSelector} from "shared/hooks";
import {selectCanvasObjectsState} from "widgets/canvas/model/canvasObjectsSlice";
import CanvasPropertiesEditor from "features/canvasPropertiesEditor";

const PropertiesEditor = () => {
    const objs = useAppSelector(selectCanvasObjectsState);
    const selectedObj = objs.filter((obj) => obj.selected)[0];
    return selectedObj ? <CanvasObjectPropertiesEditor selectedObj={selectedObj}/> : <CanvasPropertiesEditor/>
};

export default PropertiesEditor;