import {ArtObject, CanvasObject, CanvasObjectTypes, FontFamily, FontStyle, ImageObject, Shapes, TextObject} from "shared/types";
import {v4 as uuid4v} from "uuid";

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

export const createText = (
    id: string,  
    content: string, 
    fontFamily: FontFamily, 
    fontSize: number, 
    color: string,
    style: FontStyle
): TextObject => {
    return {
        id: id,
        type: CanvasObjectTypes.Text,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        selected: false,
        scale: {x: 1, y: 1},
        content,
        fontFamily,
        fontSize,
        color,
        style
    };
}

export const createSelectionArea = (x: number, y: number): CanvasObject => {
    return {
        id: uuid4v(),
        type: CanvasObjectTypes.Selection,
        x,
        y,
        width: 0,
        height: 0,
        selected: false,
        scale: {x: 1, y: 1}
    };
};