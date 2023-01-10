import {useAppDispatch} from "shared/hooks/redux";
import {deselectAll} from "widgets/canvas/model/canvasObjectsSlice";
import {downloadImage, exportAsPng} from "shared/lib";
import {clear} from "widgets/canvas/model/selectionSlice";

export const useExportCanvas = (title: string): () => void => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(deselectAll());
        dispatch(clear());
        setTimeout(() => {
            downloadImage(exportAsPng(), title);
        }, 0);
    };
};