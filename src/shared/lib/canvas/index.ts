import {CanvasObject, CanvasObjectTypes, Shapes} from "shared/types";

export const isMouseInCanvasObject = (x: number, y: number, obj: CanvasObject) => {
    const topSide = obj.y;
    const rightSide = obj.x + obj.width;
    const bottomSide = obj.y + obj.height;
    const leftSide = obj.x;

    return x > leftSide && x < rightSide && y > topSide && y < bottomSide;
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
        color: "green",
        shape: Shapes.Triangle
    };
};