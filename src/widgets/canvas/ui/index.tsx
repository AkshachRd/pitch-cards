import {useEffect, useRef, MouseEvent, useCallback} from "react";
import {
    applyFilter,
    clearCanvas,
    drawBackground,
    drawCanvasObjects,
    drawSelectionLines,
    replaceElementsById
} from "../lib";
import {useAppDispatch, useAppSelector} from "shared/hooks/redux";
import {selectCanvasState} from "../model/canvasSlice";
import useDragNDrop from "../lib/useDragAndDrop";
import "./styles.scss";
import useResize from "../lib/useResize";
import useAreaSelection from "../lib/useAreaSelection";
import {selectCanvasObjectsState} from "../model/canvasObjectsSlice";
import {selectSelection} from "../model/selectionSlice";
import {redo, selectHistory, undo} from "shared/history";

export const Canvas = () => {
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasObjects = useAppSelector(selectCanvasObjectsState);
    const selection = useAppSelector(selectSelection);
    const {width: canvasWidth, height: canvasHeight, filter} = useAppSelector(selectCanvasState);
    const {past, future} = useAppSelector(selectHistory);
    const [
        skeletonsDragNDrop,
        mouseDownDragNDrop,
        mouseUpDragNDrop,
        mouseOutDragNDrop,
        mouseMoveDragNDrop
    ] = useDragNDrop(canvasObjects);
    const [mouseDownResize, mouseUpResize, mouseOutResize, mouseMoveResize] = useResize(canvasObjects);
    const [
        mouseDownAreaSelection,
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

    // TODO: Выделить в хук нажатие клавиш
    const disabledUndo = !past.length;
    const disabledRedo = !future.length;
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "z" && e.ctrlKey && !disabledUndo) {
            dispatch(undo());
        }
        else if (e.key.toLowerCase() === "y" && e.ctrlKey && !disabledRedo) {
            dispatch(redo());
        }
    }, [disabledRedo, disabledUndo, dispatch]);

    useEffect(() => {
        canvasRef.current?.scrollIntoView({behavior: "smooth"});
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    });

    useEffect(() => {
        const context = canvasRef.current?.getContext("2d");
        if (!context) {
            throw new Error("Context is not assigned")
        }

        clearCanvas(context);
        drawBackground(context, "white");
        drawCanvasObjects(context, replaceElementsById(canvasObjects, skeletonsDragNDrop));
        //drawSkeletons(context, skeletonsDragNDrop);
        drawSelectionLines(context, selection);
        applyFilter(context, filter, 0.7);
    }, [canvasObjects, selection, filter, skeletonsDragNDrop, canvasWidth, canvasHeight]);

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