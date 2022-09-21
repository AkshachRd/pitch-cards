import {MouseEvent, useReducer, useState} from "react";
import {CanvasObject} from "shared/types";
import {useAppDispatch} from "shared/hooks";
import {editCoords} from "../model/canvasSlice";
import {isMouseInCanvasObject} from "shared/lib/canvas";

type ObjIndex = number | null;

const useDragNDrop = (objs: Array<CanvasObject>) => {
    const [dragging, toggleDragging] = useReducer((state) => !state, false);
    const [currentObjIndex, setCurrentObjIndex] = useState<ObjIndex>(null);
    const [coords, setCoords] = useState({x: 0, y: 0})
    const dispatch = useAppDispatch();

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.cursor = 'pointer';
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        setCoords({x: e.clientX, y: e.clientY});

        objs.forEach((obj, index) => {
            if (isMouseInCanvasObject(clickX, clickY, obj))
            {
                setCurrentObjIndex(index);
                toggleDragging();
                return;
            }
        })
    }

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        e.preventDefault();
        e.currentTarget.style.cursor = 'auto';
        toggleDragging();
    }

    const mouseOut = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        e.preventDefault();
        e.currentTarget.style.cursor = 'auto';
        toggleDragging();
    }

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dx = mouseX - coords.x;
        const dy = mouseY - coords.y;

        if (currentObjIndex == null) throw new Error('Draggable object is not assigned');
        const currObj = objs[currentObjIndex];
        dispatch(editCoords({id: currObj.id, x: currObj.x + dx, y: currObj.y + dy}));
        setCoords({x: mouseX, y: mouseY});
    }


    return [mouseDown, mouseUp, mouseOut, mouseMove];
}

export default useDragNDrop;
