import {MouseEvent, useCallback, useReducer, useState} from "react";
import {CanvasObject, Coords, Rect} from "shared/types";
import {useAppDispatch} from "shared/hooks";
import {editCoords} from "../model/canvasObjectsSlice";
import {isMouseInRect, isMouseInRectCorner} from "shared/lib/canvas";

const useDragNDrop = (objs: Array<CanvasObject>): [
    Array<Rect>,
    (e: MouseEvent<HTMLCanvasElement>) => void,
    (e: MouseEvent<HTMLCanvasElement>) => void,
    (e: MouseEvent<HTMLCanvasElement>) => void,
    (e: MouseEvent<HTMLCanvasElement>) => void] => {
    const [dragging, toggleDragging] = useReducer((state) => !state, false);
    const [coords, setCoords] = useState<Coords>({x: 0, y: 0});
    const [skeletons, setSkeletons] = useState<Array<Rect>>([]);
    const selectedObjs = objs.filter((obj) => obj.selected);
    const dispatch = useAppDispatch();

    const isObjInSelectedObjs = useCallback((obj: CanvasObject) => selectedObjs.indexOf(obj) > -1
    , [selectedObjs]);

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';
        setCoords({x: e.clientX, y: e.clientY});

        const canvasRect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;

        const draggingObj = objs.find((obj) => {
            const objRect = (({x, y, width, height}) => ({x, y, width, height}))(obj);
            return isMouseInRect(clickX, clickY, objRect) && !isMouseInRectCorner(clickX, clickY, objRect);
        });

        if (draggingObj)
        {
            toggleDragging();
            setSkeletons(isObjInSelectedObjs(draggingObj) ? selectedObjs : [draggingObj]);
        }
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        e.preventDefault();
        e.currentTarget.style.cursor = 'auto';

        selectedObjs.forEach(({id}, index) => {
            const {x, y} = skeletons[index];
            dispatch(editCoords({id, x, y}));
        });
        setSkeletons([]);
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

        setSkeletons((state) => state.map(({x, y, width, height}) => {
            return {x: x + dx, y: y + dy, width, height};
        }));
        setCoords({x: mouseX, y: mouseY});
    };

    return [skeletons, mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useDragNDrop;
