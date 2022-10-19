import { Rect } from "./rect";

export enum CanvasObjectTypes
{
    Text = "TEXT",
    Image = "IMAGE",
    ArtObject = "ARTOBJECT",
}

export interface CanvasObject extends Rect
{
    id: string;
    type: CanvasObjectTypes;
    selected: boolean;
    scale: {x: number, y: number};
}