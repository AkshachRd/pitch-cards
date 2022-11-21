import DropdownMenu from "entities/dropdownMenu";
import DropdownMenuItem from "entities/dropdownMenuItem";
import {downloadImage, exportAsPng} from "shared/lib";
import "./styles.css";
import {useAppSelector} from "shared/hooks";
import {selectCanvasState} from "widgets/canvas/model/canvasSlice";

const DropdownMenuBar = () => {
    const {title} = useAppSelector(selectCanvasState);

    const FileMenu = () => {
        return (
            <DropdownMenu title="File">
                <DropdownMenuItem onClick={() => downloadImage(exportAsPng(), title)}>
                    Export as PNG
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