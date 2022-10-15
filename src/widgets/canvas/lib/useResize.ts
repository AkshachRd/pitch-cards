import {MouseEvent, useReducer, useState} from "react";
import {CanvasObject} from "shared/types";
import {useAppDispatch} from "shared/hooks";
import {changeScale, editCoordsByIndex, resizeObject} from "../model/canvasSlice";
import {isMouseInCorner} from "shared/lib/canvas";

const useResize = (objs: Array<CanvasObject>) => {
    const dispatch = useAppDispatch();
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [resizing, toggleResizing] = useReducer((state) => !state, false);
    const [[dragTL, dragBL, dragTR, dragBR], setDragCorner] = useState([false, false, false, false]); // TL BL TR BR

    const selectedObjs = objs.filter((obj) => obj.selected);

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';
        setCoords({x: e.clientX, y: e.clientY});

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        selectedObjs.forEach((obj) => {
            if (isMouseInCorner(clickX, clickY, obj.x, obj.y)) //dragTL
            {
                setDragCorner([true, false, false, false]);
                toggleResizing();
            }
            else if (isMouseInCorner(clickX, clickY, obj.x, obj.y + obj.height)) //dragBL
            {
                setDragCorner([false, true, false, false]);
                toggleResizing();
            }
            else if (isMouseInCorner(clickX, clickY, obj.x + obj.width, obj.y)) //dragTR
            {
                setDragCorner([false, false, true, false]);
                toggleResizing();
            }
            else if (isMouseInCorner(clickX, clickY, obj.x + obj.width, obj.y + obj.height)) //dragBR
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

            const scaleX = obj.scale.x;
            const scaleY = obj.scale.y;

            if (dragTL)
            {
                const width = obj.width - dx;
                const height = obj.height - dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([false, false, false, true]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY * -1}));
                }
                else if (width < 0)
                {
                    setDragCorner([false, false, true, false]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY}));
                }
                else if (height < 0)
                {
                    setDragCorner([false, true, false, false]);
                    dispatch(changeScale({index, x: scaleX, y: scaleY * -1}));
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x + dx, y: obj.y + dy}));
                    dispatch(resizeObject({index, width: obj.width - dx, height: obj.height - dy}));
                }
            }
            else if (dragTR)
            {
                const width = obj.width + dx;
                const height = obj.height - dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([false, true, false, false]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY * -1}));
                }
                else if (width < 0)
                {
                    setDragCorner([true, false, false, false]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY}));
                }
                else if (height < 0)
                {
                    setDragCorner([false, false, false, true]);
                    dispatch(changeScale({index, x: scaleX, y: scaleY * -1}));
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x, y: obj.y + dy}));
                    dispatch(resizeObject({index, width: obj.width + dx, height: obj.height - dy}));
                }
            }
            else if (dragBL)
            {
                const width = obj.width - dx;
                const height = obj.height + dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([false, false, true, false]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY * -1}));
                }
                else if (width < 0)
                {
                    setDragCorner([false, false, false, true]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY}));
                }
                else if (height < 0)
                {
                    setDragCorner([true, false, false, false]);
                    dispatch(changeScale({index, x: scaleX, y: scaleY * -1}));
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x + dx, y: obj.y}));
                    dispatch(resizeObject({index, width: obj.width - dx, height: obj.height + dy}));
                }
            }
            else if (dragBR)
            {
                const width = obj.width + dx;
                const height = obj.height + dy;

                if (width < 0 && height < 0)
                {
                    setDragCorner([true, false, false, false]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY * -1}));
                }
                else if (width < 0)
                {
                    setDragCorner([false, true, false, false]);
                    dispatch(changeScale({index, x: scaleX * -1, y: scaleY}));
                }
                else if (height < 0)
                {
                    setDragCorner([false, false, true, false]);
                    dispatch(changeScale({index, x: scaleX, y: scaleY * -1}));
                }
                else
                {
                    dispatch(editCoordsByIndex({index, x: obj.x, y: obj.y}));
                    dispatch(resizeObject({index, width: obj.width + dx, height: obj.height + dy}));
                }
            }
        });

        setCoords({x: e.clientX, y: e.clientY});
    };

    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useResize;