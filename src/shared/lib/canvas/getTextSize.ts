import {Size} from "shared/types";

export const getTextSize = (content: string, font: string): Size => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.font = font;

    const metrics = ctx.measureText(content);
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    canvas.remove();

    return {width: metrics.width, height};
};