import {MouseEvent, useReducer, useState} from "react";
import {CanvasObject} from "shared/types";
import {useAppDispatch} from "shared/hooks";
import {editCoords} from "../model/canvasObjectsSlice";
import {isMouseInRect, isMouseInRectCorner} from "shared/lib/canvas";

const useDragNDrop = (objs: Array<CanvasObject>) => {
    const [dragging, toggleDragging] = useReducer((state) => !state, false);
    const [coords, setCoords] = useState({x: 0, y: 0});
    const dispatch = useAppDispatch();

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';
        setCoords({x: e.clientX, y: e.clientY});

        const canvasRect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;

        if (objs.find((obj) => {
            const objRect = (({x, y, width, height}) => ({x, y, width, height}))(obj);
            return isMouseInRect(clickX, clickY, objRect) && !isMouseInRectCorner(clickX, clickY, objRect);
        }))
        {
            toggleDragging();
        }
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        e.preventDefault();
        e.currentTarget.style.cursor = 'auto';
        toggleDragging();
    };

    const mouseOut = mouseUp;

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dx = mouseX - coords.x;
        const dy = mouseY - coords.y;

        objs.forEach((obj) => {
            if (obj.selected)
            {
                dispatch(editCoords({id: obj.id, x: obj.x + dx, y: obj.y + dy}));
            }
        });
        setCoords({x: mouseX, y: mouseY});
    };


    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useDragNDrop;
