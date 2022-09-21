import {Shapes, CanvasObject, CanvasObjectTypes, ArtObject} from "shared/types";
import {isArtObject} from "shared/lib/typeGuards";

export const drawCanvasObjects = (ctx: CanvasRenderingContext2D,
                                  canvasWidth: number,
                                  canvasHeight: number,
                                  objs: Array<CanvasObject>) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    objs.forEach((obj) => {
        drawCanvasObject(ctx, obj);
    })
}

const drawCanvasObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    switch (obj.type)
    {
        case CanvasObjectTypes.ArtObject:
            if (isArtObject(obj))
            {
                drawArtObject(ctx, obj);
            }
            break;
    }
}

const drawArtObject = (ctx: CanvasRenderingContext2D, obj: ArtObject) => {
    ctx.fillStyle = obj.color;
    switch (obj.shape)
    {
        case Shapes.Circle:
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.width / 2, 0, Math.PI * 2);
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
}
