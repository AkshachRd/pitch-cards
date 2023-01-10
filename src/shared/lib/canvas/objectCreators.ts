import {
    ArtObject,
    CanvasObjectTypes, Coords,
    FontFamily,
    FontStyle,
    FontWeight,
    ImageObject,
    Shapes,
    TextObject
} from "shared/types";
import {getCanvasFont} from "./getCanvasFont";
import {getTextSize} from "./getTextSize";

export const createRect = (id: string, {x, y}: Coords): ArtObject => {
    return {
        id: id,
        type: CanvasObjectTypes.ArtObject,
        x: x - 25,
        y: y - 25,
        width: 50,
        height: 50,
        selected: false,
        scale: {x: 1, y: 1},
        color: "#e8b30e",
        shape: Shapes.Rectangle
    };
};

export const createEllipse = (id: string, {x, y}: Coords): ArtObject => {
    return {
        id: id,
        type: CanvasObjectTypes.ArtObject,
        x: x - 25,
        y: y - 25,
        width: 50,
        height: 50,
        selected: false,
        scale: {x: 1, y: 1},
        color: "#e8b30e",
        shape: Shapes.Ellipse
    };
};

export const createTriangle = (id: string, {x, y}: Coords): ArtObject => {
    return {
        id: id,
        type: CanvasObjectTypes.ArtObject,
        x: x - 25,
        y: y - 25,
        width: 50,
        height: 50,
        selected: false,
        scale: {x: 1, y: 1},
        color: "#e8b30e",
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
    {x, y}: Coords,
    content: string, 
    fontFamily: FontFamily, 
    fontSize: number, 
    color: string,
    fontStyle: FontStyle,
    fontWeight: FontWeight
): TextObject => {
    const {width, height} = getTextSize(content, getCanvasFont(fontStyle, fontWeight, fontSize, fontFamily));

    return {
        id: id,
        type: CanvasObjectTypes.Text,
        x: x - Math.ceil((width + 10) / 2),
        y: y - Math.ceil((height + 10) / 2),
        width: Math.ceil(width) + 10,
        height: Math.ceil(height) + 10,
        selected: false,
        scale: {x: 1, y: 1},
        content,
        fontFamily,
        fontSize,
        color,
        fontStyle,
        fontWeight
    };
}