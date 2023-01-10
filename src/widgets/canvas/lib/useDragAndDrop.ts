import {MouseEvent, useCallback, useReducer, useState} from "react";
import {CanvasObject, Coords} from "shared/types";
import {useAppDispatch} from "shared/hooks/redux";
import {editCoords} from "../model/canvasObjectsSlice";
import {isMouseInRect, isMouseInRectCorner} from "shared/lib/canvas";
import {findLast} from "shared/lib";

const useDragNDrop = (objs: Array<CanvasObject>): [
    Array<CanvasObject>,
    (e: MouseEvent<HTMLCanvasElement>) => void,
    (e: MouseEvent<HTMLCanvasElement>) => void,
    (e: MouseEvent<HTMLCanvasElement>) => void,
    (e: MouseEvent<HTMLCanvasElement>) => void] => {
    const [dragging, toggleDragging] = useReducer((state) => !state, false);
    const [coords, setCoords] = useState<Coords>({x: 0, y: 0});
    const [skeletons, setSkeletons] = useState<Array<CanvasObject>>([]);
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

        const draggingObj = findLast(objs, (obj) => {
            return isMouseInRect(clickX, clickY, obj);
        });

        if (draggingObj && selectedObjs.every((obj) => !isMouseInRectCorner(clickX, clickY, obj)))
        {
            toggleDragging();
            setSkeletons(isObjInSelectedObjs(draggingObj) ? selectedObjs : [draggingObj]);
        }
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!dragging) return;

        e.preventDefault();
        e.currentTarget.style.cursor = 'auto';

        skeletons.forEach(({id, x, y}) => {
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

        setSkeletons((state) => state.map((skeleton) => {
            return {...skeleton, x: skeleton.x + dx, y: skeleton.y + dy, selected: true};
        }));
        setCoords({x: mouseX, y: mouseY});
    };

    return [skeletons, mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useDragNDrop;
