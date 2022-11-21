import {useEffect, useRef, MouseEvent, useCallback} from "react";
import {applyFilter, clearCanvas, drawBackground, drawCanvasObjects, drawSelectionLines} from "../lib";
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

    const handleMouseDown = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
        mouseDownAreaSelection(e);
        mouseDownDragNDrop(e);
        mouseDownResize(e);
    }, [mouseDownAreaSelection, mouseDownDragNDrop, mouseDownResize]);

    const handleMouseUp = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
        mouseUpAreaSelection(e);
        mouseUpDragNDrop(e);
        mouseUpResize(e);
    }, [mouseUpAreaSelection, mouseUpDragNDrop, mouseUpResize]);

    const handleMouseOut = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
        mouseOutAreaSelection(e);
        mouseOutDragNDrop(e);
        mouseOutResize(e);
    }, [mouseOutAreaSelection, mouseOutDragNDrop, mouseOutResize]);

    const handleMouseMove = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
        mouseMoveAreaSelection(e);
        mouseMoveDragNDrop(e);
        mouseMoveResize(e);
    }, [mouseMoveAreaSelection, mouseMoveDragNDrop, mouseMoveResize]);

    useEffect(() => {
        const context = canvasRef.current?.getContext("2d");
        if (!context) {
            throw new Error("Context is not assigned")
        }

        clearCanvas(context);
        drawBackground(context, "white");
        drawCanvasObjects(context, canvasObjects);
        drawSelectionLines(context, selection);
        applyFilter(context, filter, 0.7);
    }, [canvasObjects, selection, filter]);

    return (
        <div className="canvas-wrapper">
            <canvas
                ref={canvasRef}
                id="canvas"
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
                onMouseMove={handleMouseMove}
            />
        </div>
    )
}