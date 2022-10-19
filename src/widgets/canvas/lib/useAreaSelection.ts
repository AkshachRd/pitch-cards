import {CanvasObject} from "shared/types";
import {useAppDispatch, useAppSelector} from "shared/hooks";
import {MouseEvent, useState, useReducer, useEffect, useCallback} from "react";
import { clearSelection, deselect, editSelectionCoords, resizeSelection, select, selectCanvasSelection } from "../model/canvasSlice";
import { areRectsIntersect, isMouseInCanvasObject, isMouseInCanvasObjectCorner } from "shared/lib/canvas";

const useAreaSelection = (objs: Array<CanvasObject>) => {
    const dispatch = useAppDispatch();
    const selection = useAppSelector(selectCanvasSelection);
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [selectingArea, toggleSelectingArea] = useReducer((state) => !state, false);
    const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>([]);

    const addSelectedIndex = (index: number) => {
        setSelectedIndexes((current) => [...current, index]);
    };

    const isObjIndexInSelectedIndexes = useCallback((index: number) => {
        return selectedIndexes.indexOf(index) > -1;
    }, [selectedIndexes]);
    

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        setCoords({x: clickX, y: clickY});

        let dragging = false;

        objs.forEach((obj, index) => {
            dispatch(clearSelection());

            if (isMouseInCanvasObject(clickX, clickY, obj))
            {
                if (!obj.selected)
                {
                    if (e.shiftKey)
                    {
                        addSelectedIndex(index);
                    }
                    else if (!isObjIndexInSelectedIndexes(index))
                    {
                        setSelectedIndexes([index]);
                    }
                }

                dragging = true;
            }
            else if (obj.selected && isMouseInCanvasObjectCorner(clickX, clickY, obj))
            {
                dragging = true;
            }
        });

        if (!dragging)
        {
            setSelectedIndexes([]);
            dispatch(editSelectionCoords({x: clickX, y: clickY}));
            toggleSelectingArea();
        }
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!selectingArea) return;

        e.preventDefault();

        let selectedObjsIndexes: Array<number> = [];
        objs.forEach((obj, index) => {
            if (areRectsIntersect(selection, obj))
            {
                selectedObjsIndexes = [...selectedObjsIndexes, index];
            }
        });

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

        const x = Math.min(coords.x, clickX);
        const y = Math.min(coords.y, clickY);
        const width = Math.abs(coords.x - clickX);
        const height = Math.abs(coords.y - clickY);

        if (selection.x !== x || selection.y !== y)
        {
            dispatch(editSelectionCoords({x, y}));
        }
        if (selection.width !== width || selection.height !== height)
        {
            dispatch(resizeSelection({width, height}));
        }
    };

    useEffect(() => {
        objs.forEach((obj, index) => {
            if (isObjIndexInSelectedIndexes(index))
            {
                if (obj.selected) return;
                dispatch(select(index));
            }
            else
            {
                if (!obj.selected) return;
                dispatch(deselect(index));
            }
        });
    }, [selectedIndexes, objs, dispatch, isObjIndexInSelectedIndexes]);

    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useAreaSelection;