import {CanvasObject} from "./canvasObject";

export const Shapes = {
    Rectangle: "Rectangle",
    Triangle: "Triangle",
    Ellipse: "Ellipse"
} as const;

export type Shapes = typeof Shapes[keyof typeof Shapes];

export interface ArtObject extends CanvasObject
{
    color: string;
    shape: Shapes;
}