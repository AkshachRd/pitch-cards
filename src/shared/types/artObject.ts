import {CanvasObject} from "./canvasObject";

export enum Shapes
{
    Circle= "CIRCLE",
    Rectangle = "RECTANGLE",
    Triangle = "TRIANGLE"
}

export interface ArtObject extends CanvasObject
{
    color: string;
    shape: Shapes   ;
}