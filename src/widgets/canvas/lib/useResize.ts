import {MouseEvent, useReducer, useState} from "react";
import {CanvasObject} from "shared/types";
import {useAppDispatch} from "shared/hooks/redux";
import {changeScale, editCoords, resize} from "../model/canvasObjectsSlice";
import {isMouseInCorner} from "shared/lib/canvas";

const useResize = (objs: Array<CanvasObject>) => {
    const dispatch = useAppDispatch();
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [resizing, toggleResizing] = useReducer((state) => !state, false);
    const [deltaX, setDeltaX] = useState(0);
    const [deltaY, setDeltaY] = useState(0);

    const selectedObjs = objs.filter((obj) => obj.selected);

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';

        const canvasRect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;

        selectedObjs.forEach((obj) => {
            if (isMouseInCorner(clickX, clickY, obj.x, obj.y)) //TL
            {
                const x = obj.x + obj.width;
                const y = obj.y + obj.height;

                setCoords({x, y});
                toggleResizing();
                setDeltaX(x - clickX);
                setDeltaY(y - clickY);
            }
            else if (isMouseInCorner(clickX, clickY, obj.x, obj.y + obj.height)) // BL
            {
                const x = obj.x + obj.width;
                const y = obj.y;

                setCoords({x, y});
                toggleResizing();
                setDeltaX(x - clickX);
                setDeltaY(y - clickY);
            }
            else if (isMouseInCorner(clickX, clickY, obj.x + obj.width, obj.y)) // TR
            {
                const x = obj.x;
                const y = obj.y + obj.height;

                setCoords({x, y});
                toggleResizing();
                setDeltaX(x - clickX);
                setDeltaY(y - clickY);
            }
            else if (isMouseInCorner(clickX, clickY, obj.x + obj.width, obj.y + obj.height)) //BR
            {
                const x = obj.x;
                const y = obj.y;

                setCoords({x, y});
                toggleResizing();
                setDeltaX(x - clickX);
                setDeltaY(y - clickY);
            }
        });
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!resizing) return;

        e.preventDefault();
        toggleResizing();
    };

    const mouseOut = mouseUp;

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!resizing) return;

        e.preventDefault();

        const canvasRect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;

        objs.forEach((obj) => {
            if (!obj.selected) return;

            const x = Math.min(coords.x, clickX);
            const y = Math.min(coords.y, clickY);
            const width = Math.abs(coords.x - clickX);
            const height = Math.abs(coords.y - clickY);
            const dx = coords.x - clickX;
            const dy = coords.y - clickY;

            const scaleX = (deltaX * dx) >= 0 ? obj.scale.x : obj.scale.x * -1;
            const scaleY = (deltaY * dy) >= 0 ? obj.scale.y : obj.scale.y * -1;

            if (obj.x !== x || obj.y !== y)
            {
                dispatch(editCoords({id: obj.id, x, y}));
            }
            if (obj.width !== width || obj.height !== height)
            {
                dispatch(resize({id: obj.id, width, height}));
            }
            if (obj.scale.x !== scaleX || obj.scale.y !== scaleY)
            {
                dispatch(changeScale({id: obj.id, x: scaleX, y: scaleY}));
            }
            
            dx === 0 ? setDeltaX(Math.sign(deltaX)) : setDeltaX(dx);
            dy === 0 ? setDeltaY(Math.sign(deltaY)) : setDeltaY(dy);
        });
    };

    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useResize;