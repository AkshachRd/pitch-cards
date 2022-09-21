import {CanvasObject} from "shared/types";
import {isMouseInCanvasObject} from "shared/lib/canvas";
import {setCurrentObjectIndex} from "../model/canvasSlice";
import {MouseEvent} from "react";
import {useAppDispatch} from "shared/hooks";

export const useSelectObject = (objs: Array<CanvasObject>, selectedObjectIndex: number | null) => {
    const dispatch = useAppDispatch();

    const click = (e: MouseEvent<HTMLCanvasElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        objs.forEach((obj, index) => {
            if (isMouseInCanvasObject(clickX, clickY, obj))
            {
                dispatch(setCurrentObjectIndex(selectedObjectIndex === index ? null : index));
                return;
            }
            dispatch(setCurrentObjectIndex(null));
        })
    }

    return [click]
}