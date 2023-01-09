import CanvasObjectPropertiesEditor from "./canvasObjectPropertiesEditor";
import {useAppSelector} from "shared/hooks";
import {selectCanvasObjectsState} from "widgets/canvas/model/canvasObjectsSlice";
import CanvasPropertiesEditor from "./canvasPropertiesEditor";
import "./styles.scss";

export const PropertiesEditor = () => {
    const objs = useAppSelector(selectCanvasObjectsState);
    const selectedObj = objs.filter((obj) => obj.selected)[0];
    return (
        <div className="properties-editor">
            {selectedObj ? <CanvasObjectPropertiesEditor selectedObj={selectedObj}/> : <CanvasPropertiesEditor/>}
        </div>
    );
};