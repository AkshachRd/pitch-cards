import {ArtObject, CanvasObjectTypes, ImageObject, Shapes} from "shared/types";

export const createRect = (id: string): ArtObject => {
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

export const createCircle = (id: string): ArtObject => {
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

export const createTriangle = (id: string): ArtObject => {
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

export const createImage = (id: string, width: number, height: number, source: string): ImageObject => {
    return {
        id: id,
        type: CanvasObjectTypes.Image,
        x: 0,
        y: 0,
        width,
        height,
        selected: false,
        scale: {x: 1, y: 1},
        source
    };
}