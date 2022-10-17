import {CanvasObject} from "shared/types";
import {useAppDispatch} from "shared/hooks";
import {MouseEvent, useState, useReducer, useEffect} from "react";
import { add, deselect, editCoordsByIndex, remove, resizeObject, select } from "../model/canvasSlice";
import { createSelectionArea, areObjsIntersect, isMouseInCanvasObject, isMouseInCanvasObjectCorner } from "shared/lib/canvas";
import { isAreaSelectionObject } from "shared/lib/typeGuards";

const useAreaSelection = (objs: Array<CanvasObject>) => {
    const dispatch = useAppDispatch();
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [selectingArea, toggleSelectingArea] = useReducer((state) => !state, false);
    const [areaSelectionObj, setAreaSelectionObj] = useState<CanvasObject | null>(null);
    const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>([]);

    const addSelectedIndex = (index: number) => {
        setSelectedIndexes((current) => [...current, index]);
    };

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';
        setCoords({x: e.clientX, y: e.clientY});

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        let dragging = false;

        objs.forEach((obj, index) => {
            if (isAreaSelectionObject(obj))
            {
                dispatch(remove(obj.id));
            }

            if (isMouseInCanvasObject(clickX, clickY, obj))
            {
                if (!obj.selected)
                {
                    if (e.shiftKey)
                    {
                        addSelectedIndex(index);
                    }
                    else if (selectedIndexes.indexOf(index) <= -1)
                    {
                        setSelectedIndexes([index]);
                    }
                }

                dragging = true;
            }
            else if (isMouseInCanvasObjectCorner(clickX, clickY, obj))
            {
                dragging = true;
            }
        });

        if (!dragging)
        {
            setSelectedIndexes([]);
            const area = createSelectionArea(clickX, clickY);
            setAreaSelectionObj(area);
            dispatch(add(area));
            toggleSelectingArea();
        }
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!selectingArea) return;

        e.preventDefault();

        let selectedObjsIndexes: Array<number> = [];

        if (areaSelectionObj)
        {
            objs.forEach((obj, index) => {
                if (!isAreaSelectionObject(obj))
                {
                    if (areObjsIntersect(areaSelectionObj, obj))
                    {
                        selectedObjsIndexes = [...selectedObjsIndexes, index];
                    }
                }
            });
        }

        setSelectedIndexes(selectedObjsIndexes);

        e.currentTarget.style.cursor = 'auto';
        toggleSelectingArea();
    };

    const mouseOut = mouseUp;

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!selectingArea) return;

        e.preventDefault();

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const dx = e.clientX - coords.x;
        const dy = e.clientY - coords.y;

        objs.forEach((obj, index) => {
            if (isAreaSelectionObject(obj))
            {
                dispatch(editCoordsByIndex({index, x: Math.min(obj.x, clickX), y: Math.min(obj.y, clickY)}));
                dispatch(resizeObject({index, 
                    width: obj.x < clickX ? obj.width + dx : obj.width - dx, 
                    height: obj.y < clickY ? obj.height + dy : obj.height - dy
                }));
                setAreaSelectionObj(obj);
            }
        });

        setCoords({x: e.clientX, y: e.clientY});
    };

    useEffect(() => {
        objs.forEach((_, index) => {
            selectedIndexes.indexOf(index) > -1 ?
                dispatch(select(index)) : dispatch(deselect(index));
        });
    }, [selectedIndexes, objs, dispatch]);

    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useAreaSelection;