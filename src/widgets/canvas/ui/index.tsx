import {useEffect, useRef, MouseEvent} from "react";
import {applyFilter, drawCanvasObjects} from "../lib";
import {useAppSelector} from "shared/hooks";
import {selectCanvasState} from "../model/canvasSlice";
import useDragNDrop from "../lib/useDragAndDrop";
import "./styles.css";
import useSelect from "../lib/useSelect";
import useResize from "../lib/useResize";

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const state = useAppSelector(selectCanvasState);
    const canvasObjects = state.objects;
    const filter = state.filter;
    const [mouseDownDragNDrop, mouseUpDragNDrop, mouseOutDragNDrop, mouseMoveDragNDrop] = useDragNDrop(canvasObjects);
    const [mouseDownResize, mouseUpResize, mouseOutResize, mouseMoveResize] = useResize(canvasObjects);
    const [mouseDownSelect] = useSelect(canvasObjects);

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        mouseDownSelect(e);
        mouseDownDragNDrop(e);
        mouseDownResize(e);
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        mouseUpDragNDrop(e);
        mouseUpResize(e);
    };

    const mouseOut = (e: MouseEvent<HTMLCanvasElement>) => {
          mouseOutDragNDrop(e);
          mouseOutResize(e);
    };

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        mouseMoveDragNDrop(e);
        mouseMoveResize(e);
    };

    useEffect(() => {
        if (!canvasRef.current) throw new Error("canvasRef is not assigned");

        const context = canvasRef.current.getContext("2d");
        if (!context) throw new Error("Context is not assigned");

        drawCanvasObjects(context, canvasObjects);
        applyFilter(context, filter, 0.7);
    }, [canvasObjects, filter]);

    return (
        <div className="canvas">
            <canvas
                ref={canvasRef}
                width={state.width}
                height={state.height}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseOut={mouseOut}
                onMouseMove={mouseMove}
            />
        </div>
    )
}