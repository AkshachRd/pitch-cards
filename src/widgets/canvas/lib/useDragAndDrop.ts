import {MouseEvent, useReducer, useState} from "react";
import {CanvasObject} from "shared/types";
import {useAppDispatch} from "shared/hooks";
import {editCoords, EditCoordsPayload, } from "../model/canvasSlice";

const useDragNDrop = (objs: Array<CanvasObject>) => {
    const [dragging, toggleDragging] = useReducer((state) => !state, false);
    const [coords, setCoords] = useState({x: 0, y: 0});
    const dispatch = useAppDispatch();

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';
        setCoords({x: e.clientX, y: e.clientY});

        if (objs.find((obj) => obj.selected))
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

        const arr = objs.reduce<Array<EditCoordsPayload>>((filtered, obj, index) => {
            if (obj.selected)
            {
                filtered.push({index, x: obj.x + dx, y: obj.y + dy});
            }
            return filtered;
        }, []);
        dispatch(editCoords(arr));
        setCoords({x: mouseX, y: mouseY});
    };


    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useDragNDrop;
