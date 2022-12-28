import DropdownMenu from "entities/dropdownMenu";
import DropdownMenuItem from "entities/dropdownMenuItem";
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
import {useExportCanvas} from "./lib";
import {redo, selectHistory, undo} from "shared/history";

interface SubMenuProps {
    selectedObjs: Array<CanvasObject>;
}

const DropdownMenuBar = () => {
    const dispatch = useAppDispatch();
    const {title} = useAppSelector(selectCanvasState);
    const objs = useAppSelector(selectCanvasObjectsState);
    const exportCanvas = useExportCanvas(title);
    const selectedObjs = objs.filter((obj) => obj.selected);
    const {setModal, unsetModal} = useModal();

    const FileMenu = memo(() => {
        return (
            <DropdownMenu title="File">
                <DropdownMenuItem onClick={() => setModal(<ImageUploader toggle={unsetModal}/>)}>
                    Open image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    exportCanvas();
                }}>
                    Export as PNG
                </DropdownMenuItem>
            </DropdownMenu>
        );
    });

    const EditMenu = memo(({selectedObjs}: SubMenuProps) => {
        const disabledDupDel = !selectedObjs.length;
        const {past, future} = useAppSelector(selectHistory);
        const disabledUndo = !past.length;
        const disabledRedo = !future.length;
        return (
            <DropdownMenu title="Edit">
                <DropdownMenuItem
                    disabled={disabledDupDel}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(copy(obj.id)))}
                >
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={disabledDupDel}
                    onClick={() => selectedObjs.forEach((obj) => dispatch(remove(obj.id)))}
                >
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={disabledUndo}
                    onClick={() => dispatch(undo())}
                >
                    Undo
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={disabledRedo}
                    onClick={() => dispatch(redo())}
                >
                    Redo
                </DropdownMenuItem>
            </DropdownMenu>
        );
    });

    const ObjectMenu = memo(({selectedObjs}: SubMenuProps) => {
        let disabled = !selectedObjs.length;
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