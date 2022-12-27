import { Rect } from "./rect";

export const CanvasObjectTypes = {
    Text: "TEXT",
    Image: "IMAGE",
    ArtObject: "ARTOBJECT",
} as const;

export type CanvasObjectTypes = typeof CanvasObjectTypes[keyof typeof CanvasObjectTypes];

export interface CanvasObject extends Rect
{
    id: string;
    type: CanvasObjectTypes;
    selected: boolean;
    scale: {x: number, y: number};
}