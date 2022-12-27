import {CanvasObject} from "./canvasObject";

export const FontFamily = {
    Arial: "Arial, Helvetica, sans-serif",
    Verdana: "Verdana, sans-serif",
    Tahoma: "Tahoma, Verdana, sans-serif",
    TrebuchetMS: "'Trebuchet MS', Helvetica, sans-serif",
    TimesNewRoman: "'Times New Roman', Times, serif",
    Georgia: "Georgia, serif",
    Garamond: "Garamond, serif",
    CourierNew: "'Courier New', Courier, monospace",
    BrushScriptMT: "'Brush Script MT', cursive"
} as const;

export type FontFamily = typeof FontFamily[keyof typeof FontFamily];

export const FontStyle = {
    Normal: "",
    Italic: "italic",
    Oblique: "oblique"
} as const;

export type FontStyle = typeof FontStyle[keyof typeof FontStyle];

export const FontWeight = {
    Normal: 400,
    Bold: 700
} as const;

export type FontWeight = typeof FontWeight[keyof typeof FontWeight];

export interface TextObject extends CanvasObject
{
    content: string;
    fontFamily: FontFamily;
    fontSize: number;
    color: string;
    fontStyle: FontStyle;
    fontWeight: FontWeight;
}