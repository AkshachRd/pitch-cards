import {CanvasObject, CanvasObjectTypes, Shapes} from "shared/types";

const closeEnough = 10;

export const isMouseInCanvasObject = (clickX: number, clickY: number, obj: CanvasObject) => {
    const topSide = obj.y;
    const rightSide = obj.x + obj.width;
    const bottomSide = obj.y + obj.height;
    const leftSide = obj.x;

    return clickX > leftSide && clickX < rightSide && clickY > topSide && clickY < bottomSide;
};

const checkCloseEnough = (closeEnough: number, p1: number, p2: number) => Math.abs(p1 - p2) < closeEnough;

export const isMouseInCorner = (clickX: number, clickY: number, cornerX: number, cornerY: number) => {
    return checkCloseEnough(closeEnough, clickX, cornerX) && checkCloseEnough(closeEnough, clickY, cornerY);
};

export const isMouseInCanvasObjectCorner = (clickX: number, clickY: number, obj: CanvasObject) => {
    const TL = isMouseInCorner(clickX, clickY, obj.x, obj.y);
    const BL = isMouseInCorner(clickX, clickY, obj.x, obj.y + obj.height);
    const TR = isMouseInCorner(clickX, clickY, obj.x + obj.width, obj.y);
    const BR = isMouseInCorner(clickX, clickY, obj.x + obj.width, obj.y + obj.height);

    return TL || BL || TR || BR;
};

export const createRect = (id: string) => {
    return {
        id: id,
        type: CanvasObjectTypes.ArtObject,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        selected: false,
        scale: {x: 1, y: 1},
        color: "green",
        shape: Shapes.Rectangle
    };
};

export const createCircle = (id: string) => {
    return {
        id: id,
        type: CanvasObjectTypes.ArtObject,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        selected: false,
        scale: {x: 1, y: 1},
        color: "green",
        shape: Shapes.Circle
    };
};

export const createTriangle = (id: string) => {
    return {
        id: id,
        type: CanvasObjectTypes.ArtObject,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        selected: false,
        scale: {x: 1, y: 1},
        color: "green",
        shape: Shapes.Triangle
    };
};