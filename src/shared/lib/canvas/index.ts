import {CanvasObject} from "shared/types";

export const isMouseInCanvasObject = (x: number, y: number, obj: CanvasObject) => {
    const topSide = obj.y;
    const rightSide = obj.x + obj.width;
    const bottomSide = obj.y + obj.height;
    const leftSide = obj.x;

    return x > leftSide && x < rightSide && y > topSide && y < bottomSide;
}