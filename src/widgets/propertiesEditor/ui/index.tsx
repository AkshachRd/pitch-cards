import CanvasObjectPropertiesEditor from "./canvasObjectPropertiesEditor";
import {useAppSelector} from "shared/hooks/redux";
import {selectCanvasObjectsState} from "widgets/canvas/model/canvasObjectsSlice";
import CanvasPropertiesEditor from "./canvasPropertiesEditor";
import "./styles.scss";

export const PropertiesEditor = () => {
    const objs = useAppSelector(selectCanvasObjectsState);
    const selectedObjs = objs.filter((obj) => obj.selected);
    return (
        <div className="properties-editor">
            {selectedObjs.length !== 1 ?
                <CanvasPropertiesEditor/>
                :
                <CanvasObjectPropertiesEditor selectedObj={selectedObjs[0]}/>
            }
        </div>
    );
};