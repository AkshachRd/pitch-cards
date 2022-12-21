import DropdownMenu from "entities/dropdownMenu";
import DropdownMenuItem from "entities/dropdownMenuItem";
import {downloadImage, exportAsPng} from "shared/lib";
import "./styles.css";
import {useAppDispatch, useAppSelector, useModal} from "shared/hooks";
import {selectCanvasState} from "widgets/canvas/model/canvasSlice";
import ImageUploader from "../imageUploader/ui";
import {
    bringForward,
    bringToFront,
    copy,
    remove,
    selectCanvasObjectsState, sendBackward, sendToBack
} from "widgets/canvas/model/canvasObjectsSlice";
import {memo} from "react";
import {CanvasObject} from "shared/types";

interface SubMenuProps {
    selectedObjs: Array<CanvasObject>;
}

const DropdownMenuBar = () => {
    const dispatch = useAppDispatch();
    const {title} = useAppSelector(selectCanvasState);
    const objs = useAppSelector(selectCanvasObjectsState);
    const selectedObjs = objs.filter((obj) => obj.selected);
    const {setModal, unsetModal} = useModal();

    const FileMenu = memo(() => {
        return (
            <DropdownMenu title="File">
                <DropdownMenuItem onClick={() => setModal(<ImageUploader toggle={unsetModal}/>)}>
                    Open image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadImage(exportAsPng(), title)}>
                    Export as PNG
                </DropdownMenuItem>
            </DropdownMenu>
        );
    });

    const EditMenu = memo(({selectedObjs}: SubMenuProps) => {
        const disabled = !selectedObjs;
        return (
            <DropdownMenu title="Edit">
                <DropdownMenuItem
                    disabled={disabled}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(copy(obj.id)))}
                >
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={disabled}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(remove(obj.id)))}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenu>
        );
    });

    const ObjectMenu = memo(({selectedObjs}: SubMenuProps) => {
        let disabled = !selectedObjs;
        return (
            <DropdownMenu title="Object">
                <DropdownMenuItem
                    disabled={disabled}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(bringToFront(obj.id)))}
                >
                    Bring to Front
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={disabled}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(bringForward(obj.id)))}
                >
                    Bring Forward
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={disabled}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(sendBackward(obj.id)))}
                >
                    Send Backward
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={disabled}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(sendToBack(obj.id)))}
                >
                    Send to Back
                </DropdownMenuItem>
            </DropdownMenu>
        )
    });

    return (
        <div className="dropdown-menu-bar">
            <FileMenu/>
            <EditMenu selectedObjs={selectedObjs}/>
            <ObjectMenu selectedObjs={selectedObjs}/>
        </div>
    )
};

export default DropdownMenuBar;