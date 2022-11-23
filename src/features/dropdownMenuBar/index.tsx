import DropdownMenu from "entities/dropdownMenu";
import DropdownMenuItem from "entities/dropdownMenuItem";
import {downloadImage, exportAsPng} from "shared/lib";
import "./styles.css";
import {useAppDispatch, useAppSelector, useModal} from "shared/hooks";
import {selectCanvasState} from "widgets/canvas/model/canvasSlice";
import ImageUploader from "../imageUploader/ui";
import {copy, remove, selectCanvasObjectsState} from "widgets/canvas/model/canvasObjectsSlice";
import {memo} from "react";

const DropdownMenuBar = () => {
    const dispatch = useAppDispatch();
    const {title} = useAppSelector(selectCanvasState);
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

    const EditMenu = memo(() => {
        const objs = useAppSelector(selectCanvasObjectsState);
        const selectedObjs = objs.filter((obj) => obj.selected);

        return (
            <DropdownMenu title="Edit">
                <DropdownMenuItem onClick={() => selectedObjs.forEach((obj) => dispatch(copy(obj.id)))}>
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => selectedObjs.forEach((obj) => dispatch(remove(obj.id)))}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenu>
        );
    });

    return (
        <div className="dropdown-menu-bar">
            <FileMenu/>
            <EditMenu/>
        </div>
    )
};

export default DropdownMenuBar;