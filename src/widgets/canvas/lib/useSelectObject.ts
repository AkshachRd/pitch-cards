import {CanvasObject} from "shared/types";
import {isMouseInCanvasObject} from "shared/lib/canvas";
import {setObjectSelectionById} from "../model/canvasSlice";
import {MouseEvent, useEffect, useState} from "react";
import {useAppDispatch} from "shared/hooks";

const useSelectObject = (objs: Array<CanvasObject>) => {
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
                    else
                    {
                        setSelectedIndexes([index]);
                    }
                }
                selected = true;
            }
        });

        if (!selected)
        {
            setSelectedIndexes([]);
        }
    };

    useEffect(() => {
        objs.forEach((obj, index) => {
            dispatch(setObjectSelectionById({id: obj.id, selected: selectedIndexes.indexOf(index) > -1}));
        });
    }, [selectedIndexes, objs, dispatch]);

    return [mouseDown]
};

export default useSelectObject;