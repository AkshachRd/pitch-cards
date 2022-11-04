import {useEffect, useRef, MouseEvent} from "react";
import {applyFilter, drawCanvasObjects, drawSelectionLines} from "../lib";
import {useAppSelector} from "shared/hooks";
import {selectCanvasState} from "../model/canvasSlice";
import useDragNDrop from "../lib/useDragAndDrop";
import "./styles.css";
import useResize from "../lib/useResize";
import useAreaSelection from "../lib/useAreaSelection";
import {selectCanvasObjectsState} from "../model/canvasObjectsSlice";
import {selectSelection} from "../model/selectionSlice";

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasObjects = useAppSelector(selectCanvasObjectsState);
    const selection = useAppSelector(selectSelection);
    const {width: canvasWidth, height: canvasHeight, filter} = useAppSelector(selectCanvasState);
    const [mouseDownDragNDrop, mouseUpDragNDrop, mouseOutDragNDrop, mouseMoveDragNDrop] = useDragNDrop(canvasObjects);
    const [mouseDownResize, mouseUpResize, mouseOutResize, mouseMoveResize] = useResize(canvasObjects);
    const [mouseDownAreaSelection, 
        mouseUpAreaSelection, 
        mouseOutAreaSelection,
        mouseMoveAreaSelection
    ] = useAreaSelection(canvasObjects);

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        mouseDownAreaSelection(e);
        mouseDownDragNDrop(e);
        mouseDownResize(e);
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        mouseUpAreaSelection(e);
        mouseUpDragNDrop(e);
        mouseUpResize(e);
    };

    const mouseOut = (e: MouseEvent<HTMLCanvasElement>) => {
        mouseOutAreaSelection(e);
        mouseOutDragNDrop(e);
        mouseOutResize(e);
    };

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        mouseMoveAreaSelection(e);
        mouseMoveDragNDrop(e);
        mouseMoveResize(e);
    };

    useEffect(() => {
        if (!canvasRef.current) throw new Error("canvasRef is not assigned");

        const context = canvasRef.current.getContext("2d");
        if (!context) throw new Error("Context is not assigned");

        drawCanvasObjects(context, canvasObjects);
        drawSelectionLines(context, selection);
        applyFilter(context, filter, 0.7);
    }, [canvasObjects, selection, filter]);

    return (
        <div className="canvas">
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseOut={mouseOut}
                onMouseMove={mouseMove}
            />
        </div>
    )
}