import {useEffect, useRef} from "react";
import {applyFilter, drawCanvasObjects, useSelectObject} from "../lib";
import {useAppSelector} from "shared/hooks";
import {selectCanvasState} from "../model/canvasSlice";
import useDragNDrop from "../lib/useDragAndDrop";
import "./styles.css";

interface CanvasProps
{
    width: number;
    height: number;
}

export const Canvas = ({width, height}: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const state = useAppSelector(selectCanvasState);
    const canvasObjects = state.objects;
    const filter = state.filter;
    const selectedObjectIndex = state.currentObjectIndex;
    const [mouseDown, mouseUp, mouseOut, mouseMove] = useDragNDrop(canvasObjects);
    const [click] = useSelectObject(canvasObjects, selectedObjectIndex);

    useEffect(() => {
        if (!canvasRef.current) throw new Error("canvasRef is not assigned");

        const context = canvasRef.current.getContext("2d");
        if (!context) throw new Error("Context is not assigned");

        drawCanvasObjects(context, width, height, canvasObjects);
        applyFilter(context, filter, 0.7);
    }, [width, height, canvasObjects, filter]);

    return (
        <canvas
            className="canvas"
            ref={canvasRef}
            width={width}
            height={height}
            onClick={click}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseOut={mouseOut}
            onMouseMove={mouseMove}
        />
    )
}