import {CanvasObject} from "shared/types";
import {useAppDispatch, useAppSelector} from "shared/hooks";
import {MouseEvent, useState, useReducer} from "react";
import { clear, changeCoords, resize, selectSelection } from "../model/selectionSlice";
import {select, deselect} from "../model/canvasObjectsSlice";
import { areRectsIntersect, isMouseInRect, isMouseInRectCorner, isSelectionClear } from "shared/lib/canvas";
import {findLastIndex} from "shared/lib";

const useAreaSelection = (objs: Array<CanvasObject>) => {
    const dispatch = useAppDispatch();
    const selection = useAppSelector(selectSelection);
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [selectingArea, setSelectingArea] = useState(false);
    const [selecting, toggleSelecting] = useReducer((state) => !state, false);
    const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>([]);

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        e.currentTarget.style.cursor = 'pointer';

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        setCoords({x: clickX, y: clickY});

        if (!isSelectionClear(selection)) {
            dispatch(clear());
        }

        let selectedObjsIndexes: Array<number> = objs.reduce<Array<number>>((indexes, obj, index) => {
            if (obj.selected) {
                indexes.push(index);
            }
            return indexes;
        }, []);

        const draggingObjIndex = findLastIndex(objs, (obj) => {
            return isMouseInRect(clickX, clickY, obj) || isMouseInRectCorner(clickX, clickY, obj);
        });

        const isDraggingObj = draggingObjIndex > -1;
        if (isDraggingObj) {
            const isDraggingObjSelected = selectedObjsIndexes.indexOf(draggingObjIndex) <= -1;
            if (isDraggingObjSelected) {
                if (e.shiftKey) {
                    selectedObjsIndexes.push(draggingObjIndex);
                }
                else {
                    selectedObjsIndexes = [draggingObjIndex];
                }
            }
        }
        else {
            setSelectedIndexes([]);
            toggleSelecting();
            dispatch(changeCoords({x: clickX, y: clickY}));
            setSelectingArea(true);
            return;
        }

        setSelectedIndexes(selectedObjsIndexes);
        toggleSelecting();
    };

    const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!selecting) return;

        e.preventDefault();

        let selectedObjsIndexes: Array<number> = [...selectedIndexes];
        if (selectingArea) {
            objs.forEach((obj, index) => {
                if (areRectsIntersect(selection, obj)) {
                    selectedObjsIndexes.push(index);
                }
            });
        }

        objs.forEach((obj, index) => {
            if (selectedObjsIndexes.indexOf(index) > -1) {
                if (obj.selected) return;
                dispatch(select(obj.id));
            }
            else {
                if (!obj.selected) return;
                dispatch(deselect(obj.id));
            }
        });

        setSelectedIndexes([]);

        e.currentTarget.style.cursor = 'auto';
        setSelectingArea(false);
        toggleSelecting();
    };

    const mouseOut = mouseUp;

    const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!selecting || !selectingArea) return;

        e.preventDefault();

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const x = Math.min(coords.x, clickX);
        const y = Math.min(coords.y, clickY);
        const width = Math.abs(coords.x - clickX);
        const height = Math.abs(coords.y - clickY);

        if (selection.x !== x || selection.y !== y) {
            dispatch(changeCoords({x, y}));
        }
        if (selection.width !== width || selection.height !== height) {
            dispatch(resize({width, height}));
        }
    };

    return [mouseDown, mouseUp, mouseOut, mouseMove];
};

export default useAreaSelection;