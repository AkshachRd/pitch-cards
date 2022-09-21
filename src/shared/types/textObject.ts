import {CanvasObject} from "./canvasObject";

export interface TextObject extends CanvasObject
{
    content: string;
    fontFamily: string;
    fontSize: number;
    style: string;
}