import {CanvasObject} from "./canvasObject";

export enum Shapes
{
    Rectangle = "RECTANGLE",
    Triangle = "TRIANGLE",
    Ellipse = "ELLIPSE"
}

export interface ArtObject extends CanvasObject
{
    color: string;
    shape: Shapes;
}