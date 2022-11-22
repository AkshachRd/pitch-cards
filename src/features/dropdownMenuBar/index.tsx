import DropdownMenu from "entities/dropdownMenu";
import DropdownMenuItem from "entities/dropdownMenuItem";
import {downloadImage, exportAsPng} from "shared/lib";
import "./styles.css";
import {useAppSelector, useModal} from "shared/hooks";
import {selectCanvasState} from "widgets/canvas/model/canvasSlice";
import ImageUploader from "../imageUploader/ui";

const DropdownMenuBar = () => {
    const {title} = useAppSelector(selectCanvasState);
    const {setModal, unsetModal} = useModal();

    const FileMenu = () => {
        return (
            <DropdownMenu title="File">
                <DropdownMenuItem onClick={() => downloadImage(exportAsPng(), title)}>
                    Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModal(<ImageUploader toggle={unsetModal}/>)}>
                    Open modal
                </DropdownMenuItem>
            </DropdownMenu>
        );
    };

    const EditMenu = () => {
        return (
            <DropdownMenu title="Edit">
                <DropdownMenuItem>Aboba</DropdownMenuItem>
            </DropdownMenu>
        );
    };

    return (
        <div className="dropdown-menu-bar">
            <FileMenu/>
            <EditMenu/>
        </div>
    )
};

export default DropdownMenuBar;