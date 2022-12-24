import {ArtObject, CanvasObject, CanvasObjectTypes, ImageObject, Rect, Shapes, TextObject} from "shared/types";
import {isArtObject, isImageObject, isTextObject} from "shared/lib/typeGuards";
import {getCanvasFont} from "shared/lib";

const pattern = [10, 10];

const isMultipleObjsSelected = (objs: Array<CanvasObject>) => {
    return objs.filter((obj) => obj.selected).length > 1;
};

export const drawCanvasObjects = (ctx: CanvasRenderingContext2D,
                                  objs: Array<CanvasObject>) => {
    const CORNER_SIDE_LENGTH = Number(process.env.REACT_APP_OBJECT_CORNER_SIDE_LENGTH ?? "10");
    const CORNER_COLOR = process.env.REACT_APP_OBJECT_CORNER_COLOR ?? "#000";

    const isMultipleSelectedObjs = isMultipleObjsSelected(objs);

    objs.forEach((obj) => {
        const rect = (({x, y, width, height}) => ({x, y, width, height}))(obj);
        drawCanvasObject(ctx, obj);
        if (obj.selected)
        {
            drawSelectionLines(ctx, rect);
            !isMultipleSelectedObjs && drawDragCorners(ctx, rect, CORNER_SIDE_LENGTH, CORNER_COLOR);
        }
    })
};

const drawCanvasObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    ctx.save();

    const scaleX = obj.scale.x;
    const scaleY = obj.scale.y;
    if (scaleX !== 1 || scaleY !== 1) {
        if (scaleX < 0) {
            ctx.translate(obj.x * 2 + obj.width, 0);
        }
        if (scaleY < 0) {
            ctx.translate(0, obj.y * 2 + obj.height);
        }

        ctx.scale(scaleX, scaleY);
    }

    switch (obj.type) {
        case CanvasObjectTypes.ArtObject:
            if (!isArtObject(obj)) {
                throw new Error("Can't draw ArtObject: invalid data");
            }
            drawArtObject(ctx, obj);
            break;
        case CanvasObjectTypes.Image:
            if (!isImageObject(obj)) {
                throw new Error("Can't draw Image: invalid data");
            }
            drawImageObject(ctx, obj);
            break;
        case CanvasObjectTypes.Text:
            if (!isTextObject(obj)) {
                throw new Error("Can't draw Text: invalid data");
            }
            drawTextObject(ctx, obj);
            break;
    }

    ctx.restore();
};

const drawArtObject = (ctx: CanvasRenderingContext2D, obj: ArtObject) => {
    const {x, y, width, height, color} = obj;

    ctx.fillStyle = color;
    switch (obj.shape) {
        case Shapes.Rectangle:
            ctx.fillRect(x, y, width, height);
            break;
        case Shapes.Triangle:
            ctx.beginPath();
            ctx.moveTo(x + width / 2, y);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x + width, y + height);
            ctx.fill();
            break;
        case Shapes.Ellipse:
            const radiusX = width / 2;
            const radiusY = height / 2;
            ctx.beginPath();
            ctx.ellipse(x + radiusX, y + radiusY, radiusX, radiusY, 0 , 0, Math.PI * 2);
            ctx.fill();
            break;
    }
};

const drawImageObject = (ctx: CanvasRenderingContext2D, obj: ImageObject) => {
    const img = new Image();
    img.src = obj.source;
    ctx.drawImage(img, obj.x, obj.y, obj.width, obj.height);
};

const drawTextObject = (ctx: CanvasRenderingContext2D, obj: TextObject) => {
    ctx.font = getCanvasFont(obj.fontStyle, obj.fontWeight, obj.fontSize, obj.fontFamily);
    ctx.fillStyle = obj.color;
    const metrics = ctx.measureText(obj.content);
    const contentHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    ctx.fillText(obj.content, obj.x, obj.y + contentHeight, obj.width);
};

export const drawSelectionLines = (ctx: CanvasRenderingContext2D, rect: Rect) => {
    const {x, y, width, height} = rect;

    ctx.save();

    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.restore();
};

const drawDragCorners = (ctx: CanvasRenderingContext2D, rect: Rect, side: number, color: string) => {
    ctx.save();

    const x = rect.x - side / 2;
    const y = rect.y - side / 2;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, side, side);
    ctx.fillRect(x, y + rect.height, side, side);
    ctx.fillRect(x + rect.width, y, side, side);
    ctx.fillRect(x + rect.width, y + rect.height, side, side);

    ctx.restore();
};

export const drawBackground = (ctx: CanvasRenderingContext2D, background: string) => {
    ctx.save();

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.restore();
};

export const clearCanvas = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export const drawSkeletons = (ctx: CanvasRenderingContext2D, skeletons: Array<Rect>): void => {
    ctx.save();

    ctx.fillStyle = "#black";
    skeletons.forEach((skeleton) => {
        const {x, y, width, height} = skeleton;
        ctx.strokeRect(x, y, width, height);
    });

    ctx.restore();
};