import CanvasObjectPropertiesEditor from "features/canvasObjectPropertiesEditor/ui";
import {useAppSelector} from "shared/hooks";
import {selectCanvasObjectsState} from "widgets/canvas/model/canvasObjectsSlice";

const PropertiesEditor = () => {
    const objs = useAppSelector(selectCanvasObjectsState);
    const selectedObj = objs.filter((obj) => obj.selected)[0];
    return (
        <>
            {selectedObj && <CanvasObjectPropertiesEditor selectedObj={selectedObj}/>}
        </>
    )
};

export default PropertiesEditor;