import {Size} from "shared/types";

export const getTextSize = (content: string, font: string): Size => {
    const ctx = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
    ctx.font = font;

    const metrics = ctx.measureText(content);
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    return {width: metrics.width, height};
};