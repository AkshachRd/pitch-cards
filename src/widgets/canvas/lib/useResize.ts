import {MouseEvent, useReducer, useState} from "react";
import {CanvasObject} from "shared/types";
import {useAppDispatch} from "shared/hooks";
import {editCoordsByIndex, resize} from "../model/canvasSlice";

const useResize = (objs: Array<CanvasObject>, closeEnough: number = 10) => {
    const dispatch = useAppDispatch();
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [resizing, toggleResizing] = useReducer((state) => !state, false);
    const [[dragTL, dragBL, dragTR, dragBR], setDragCorner] = useState([false, false, false, false]); // TL BL TR BR

    const checkCloseEnough = (closeEnough: number, p1: number, p2: number) => Math.abs(p1 - p2) < closeEnough;
    const selectedObjs = objs.filter((obj) => obj.selected);

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';
        setCoords({x: e.clientX, y: e.clientY});

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        selectedObjs.forEach((obj) => {
            if (checkCloseEnough(closeEnough, clickX, obj.x) && checkCloseEnough(closeEnough, clickY, obj.y)) //dragTL
            {
                setDragCorner([true, false, false, false]);
                toggleResizing();
            }
            else if (checkCloseEnough(closeEnough, clickX, obj.x) && checkCloseEnough(closeEnough, clickY, obj.y + obj.height)) //dragBL
            {
                setDragCorner([false, true, false, false]);
                toggleResizing();
            }
            else if (checkCloseEnough(closeEnough, clickX, obj.x + obj.width) && checkCloseEnough(closeEnough, clickY, obj.y)) //dragTR
            {
                setDragCorner([false, false, true, false]);
                toggleResizing();
            }
            else if (checkCloseEnough(closeEnough, clickX, obj.x + obj.width) && checkCloseEnough(closeEnough, clickY, obj.y + obj.height)) //dragBR
            {
                setDragCorner([false, false, false, true]);
                toggleResizing();
            }
        });
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!resizing) return;

        e.preventDefault();
        setDragCorner([false, false, false, false]);
        toggleResizing();
    };

    const mouseOut = mouseUp;

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!resizing) return;

        e.preventDefault();

        const dx = e.clientX - coords.x;
        const dy = e.clientY - coords.y;

        objs.forEach((obj, index) => {
            if (!obj.selected) return;

            if (dragTL)
            {
                const width = obj.width - dx;
                const height = obj.height - dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([false, false, false, true]);
                }
                else if (width < 0)
                {
                    setDragCorner([false, false, true, false]);
                }
                else if (height < 0)
                {
                    setDragCorner([false, true, false, false]);
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x + dx, y: obj.y + dy}));
                    dispatch(resize({index, width: obj.width - dx, height: obj.height - dy}));
                }
            }
            else if (dragTR)
            {
                const width = obj.width + dx;
                const height = obj.height - dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([false, true, false, false]);
                }
                else if (width < 0)
                {
                    setDragCorner([true, false, false, false]);
                }
                else if (height < 0)
                {
                    setDragCorner([false, false, false, true]);
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x, y: obj.y + dy}));
                    dispatch(resize({index, width: obj.width + dx, height: obj.height - dy}));
                }
            }
            else if (dragBL)
            {
                const width = obj.width - dx;
                const height = obj.height + dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([false, false, true, false]);
                }
                else if (width < 0)
                {
                    setDragCorner([false, false, false, true]);
                }
                else if (height < 0)
                {
                    setDragCorner([true, false, false, false]);
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x + dx, y: obj.y}));
                    dispatch(resize({index, width: obj.width - dx, height: obj.height + dy}));
                }
            }
            else if (dragBR)
            {
                const width = obj.width + dx;
                const height = obj.height + dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([true, false, false, false]);
                }
                else if (width < 0)
                {
                    setDragCorner([false, true, false, false]);
                }
                else if (height < 0)
                {
                    setDragCorner([false, false, true, false]);
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x, y: obj.y}));
                    dispatch(resize({index, width: obj.width + dx, height: obj.height + dy}));
                }
            }
        });

        setCoords({x: e.clientX, y: e.clientY});
    };

    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useResize;