import {ArtObject, CanvasObject, CanvasObjectTypes, ImageObject, Shapes, TextObject} from "shared/types";
import {isAreaSelectionObject, isArtObject, isImageObject, isTextObject} from "shared/lib/typeGuards";

const pattern = [10, 10];

export const drawCanvasObjects = (ctx: CanvasRenderingContext2D,
                                  objs: Array<CanvasObject>) => {
    const CORNER_SIDE_LENGTH = Number(process.env.REACT_APP_OBJECT_CORNER_SIDE_LENGTH);
    const cornerColor = "#000";
    const { width, height } = ctx.canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    objs.forEach((obj) => {
        drawCanvasObject(ctx, obj);
        if (obj.selected)
        {
            drawSelectionLines(ctx, obj, pattern);
            drawDragCorners(ctx, obj, CORNER_SIDE_LENGTH, cornerColor);
        }

        if (isAreaSelectionObject(obj))
        {
            drawSelectionLines(ctx, obj, pattern);
        }
    })
};

const drawCanvasObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    ctx.save();

    const scaleX = obj.scale.x;
    const scaleY = obj.scale.y;
    if (scaleX !== 1 || scaleY !== 1)
    {
        if (scaleX < 0 && scaleY < 0)
        {
            ctx.translate(obj.x * 2 + obj.width, obj.y * 2 + obj.height);
        }
        else if (scaleX < 0)
        {
            ctx.translate(obj.x * 2 + obj.width, 0);
        }
        else if (scaleY < 0)
        {
            ctx.translate(0, obj.y * 2 + obj.height);
        }

        ctx.scale(scaleX, scaleY);
    }

    switch (obj.type)
    {
        case CanvasObjectTypes.ArtObject:
            if (isArtObject(obj))
            {
                drawArtObject(ctx, obj);
            }
            break;
        case CanvasObjectTypes.Image:
            if (isImageObject(obj))
            {
                drawImageObject(ctx, obj);
            }
            break;
        case CanvasObjectTypes.Text:
            if (isTextObject(obj))
            {
                drawTextObject(ctx, obj);
            }
            break;
        case CanvasObjectTypes.Selection:
            break;
    }

    ctx.restore();
};

const drawArtObject = (ctx: CanvasRenderingContext2D, obj: ArtObject) => {
    ctx.fillStyle = obj.color;
    switch (obj.shape)
    {
        case Shapes.Circle:
            ctx.beginPath();
            ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
        case Shapes.Rectangle:
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            break;
        case Shapes.Triangle:
            ctx.beginPath();
            ctx.moveTo(obj.x + obj.width / 2, obj.y);
            ctx.lineTo(obj.x, obj.y + obj.height);
            ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
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
    ctx.font = `${obj.style} ${obj.fontSize}px ${obj.fontFamily}`;
    ctx.fillStyle = obj.color;
    const metrics = ctx.measureText(obj.content);
    const contentHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    ctx.fillText(obj.content, obj.x, obj.y + contentHeight, obj.width);
};

const drawSelectionLines = (ctx: CanvasRenderingContext2D, obj: CanvasObject, pattern: Array<number>) => {
    ctx.save();

    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(obj.x, obj.y);
    ctx.lineTo(obj.x + obj.width, obj.y);
    ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
    ctx.lineTo(obj.x, obj.y + obj.height);
    ctx.lineTo(obj.x, obj.y);
    ctx.stroke();

    ctx.restore();
};

const drawDragCorners = (ctx: CanvasRenderingContext2D, obj: CanvasObject, side: number, color: string) => {
    ctx.save();

    const x = obj.x - side / 2;
    const y = obj.y - side / 2;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, side, side);
    ctx.fillRect(x, y + obj.height, side, side);
    ctx.fillRect(x + obj.width, y, side, side);
    ctx.fillRect(x + obj.width, y + obj.height, side, side);

    ctx.restore();
};