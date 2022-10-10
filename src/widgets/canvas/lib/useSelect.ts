import {CanvasObject} from "shared/types";
import {isMouseInCanvasObject, isMouseInCanvasObjectCorner} from "shared/lib/canvas";
import {deselect, select} from "../model/canvasSlice";
import {MouseEvent, useEffect, useState} from "react";
import {useAppDispatch} from "shared/hooks";

const useSelect = (objs: Array<CanvasObject>) => {
    const dispatch = useAppDispatch();
    const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>([]);

    const add = (index: number) => {
        setSelectedIndexes((current) => [...current, index]);
    };

    const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        let selected = false;
        objs.forEach((obj, index) => {
            if (isMouseInCanvasObject(clickX, clickY, obj))
            {
                if (!obj.selected)
                {
                    if (e.shiftKey)
                    {
                        add(index);
                    }
                    else if (selectedIndexes.indexOf(index) <= -1)
                    {
                        setSelectedIndexes([index]);
                    }
                }
                selected = true;
            }
            else if (isMouseInCanvasObjectCorner(clickX, clickY, obj))
            {
                selected = true;
            }
        });

        if (!selected)
        {
            setSelectedIndexes([]);
        }
    };

    useEffect(() => {
        objs.forEach((_, index) => {
            selectedIndexes.indexOf(index) > -1 ?
                dispatch(select(index)) : dispatch(deselect(index));
        });
    }, [selectedIndexes, objs, dispatch]);

    return [mouseDown]
};

export default useSelect;