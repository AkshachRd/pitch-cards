import DropdownMenu from "entities/dropdownMenu";
import DropdownMenuItem from "entities/dropdownMenuItem";
import "./styles.css";
import {selectCanvasState} from "widgets/canvas/model/canvasSlice";
import ImageUploader from "../imageUploader/ui";
import {
    add,
    bringForward,
    bringToFront,
    copy,
    remove,
    selectCanvasObjectsState, sendBackward, sendToBack
} from "widgets/canvas/model/canvasObjectsSlice";
import {memo, useMemo} from "react";
import {CanvasObject} from "shared/types";
import {useExportCanvas, useModal, useAppDispatch, useAppSelector} from "shared/hooks";
import {newDocument, openDocument, redo, selectHistoryPresentState, selectHistoryState, undo} from "shared/history";
import TextEditor from "../textEditor";
import {createEllipse, createRect, createTriangle, exportAsJSON, loadJSON} from "shared/lib";
import {v4 as uuid4v} from "uuid";
import Icons, {IconNames} from "shared/icons";

interface SubMenuProps {
    selectedObjs: Array<CanvasObject>;
}

const FileMenu = memo(() => {
    const dispatch = useAppDispatch();
    const {title} = useAppSelector(selectCanvasState);
    const doc = useAppSelector(selectHistoryPresentState);
    const exportCanvas = useExportCanvas(title);
    const {setModal, unsetModal} = useModal();

    const uploadFile = async () => {
        const file = await loadJSON();
        dispatch(openDocument(file));
    };

    return (
        <DropdownMenu title="File">
            <DropdownMenuItem onClick={() => dispatch(newDocument())}>
                New Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={uploadFile}>
                Open Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModal(<ImageUploader toggle={unsetModal}/>)}>
                Template
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setModal(<ImageUploader toggle={unsetModal}/>)}>
                Open image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportCanvas()}>
                Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportAsJSON(doc, title)}>
                Export as JSON
            </DropdownMenuItem>
        </DropdownMenu>
    );
});

const EditMenu = memo(({selectedObjs}: SubMenuProps) => {
    const dispatch = useAppDispatch();

    const disabledDupDel = !selectedObjs.length;
    const {past, future} = useAppSelector(selectHistoryState);
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
    const dispatch = useAppDispatch();

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

const AddMenu = memo(() => {
    const dispatch = useAppDispatch();
    const {setModal, unsetModal} = useModal();
    const {width: canvasWidth, height: canvasHeight} = useAppSelector(selectCanvasState);

    return (
        <DropdownMenu title="+" className="dropdown-menu__add-menu">
            <DropdownMenuItem
                onClick={() => setModal(<TextEditor toggle={unsetModal}/>)}
            >
                Text
            </DropdownMenuItem>
            <DropdownMenuItem
                leftIcon={<Icons width={50} height={50} color={"#e8b30e"} name={IconNames.Rect}/>}
                onClick={() => {
                    dispatch(add(createRect(uuid4v(), {
                        x: Math.floor(canvasWidth / 2),
                        y: Math.floor(canvasHeight / 2)
                    })))
                }}
            >
                Rectangle
            </DropdownMenuItem>
            <DropdownMenuItem
                leftIcon={<Icons width={50} height={50} color={"#e8b30e"} name={IconNames.Triangle}/>}
                onClick={() => {
                    dispatch(add(createTriangle(uuid4v(), {
                        x: Math.floor(canvasWidth / 2),
                        y: Math.floor(canvasHeight / 2)
                    })));
                }}
            >
                Triangle
            </DropdownMenuItem>
            <DropdownMenuItem
                leftIcon={<Icons width={50} height={50} color={"#e8b30e"} name={IconNames.Circle}/>}
                onClick={() => {
                    dispatch(add(createEllipse(uuid4v(), {
                        x: Math.floor(canvasWidth / 2),
                        y: Math.floor(canvasHeight / 2)
                    })))
                }}
            >
                Ellipse
            </DropdownMenuItem>
        </DropdownMenu>
    )
});

const DropdownMenuBar = () => {
    const objs = useAppSelector(selectCanvasObjectsState);
    const selectedObjs = useMemo(() => objs.filter((obj) => obj.selected), [objs]);

    return (
        <>
            <div>
                <AddMenu/>
            </div>
            <div className="dropdown-menu-bar">
                <FileMenu/>
                <EditMenu selectedObjs={selectedObjs}/>
                <ObjectMenu selectedObjs={selectedObjs}/>
            </div>
        </>
    )
};

export default DropdownMenuBar;