export enum CanvasObjectTypes
{
    Text = "TEXT",
    Image = "IMAGE",
    ArtObject = "ARTOBJECT"
}

export interface CanvasObject
{
    id: string;
    type: CanvasObjectTypes;
    x: number;
    y: number;
    width: number;
    height: number;
    selected: boolean;
}