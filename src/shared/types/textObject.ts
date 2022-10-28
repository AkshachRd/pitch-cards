import {CanvasObject} from "./canvasObject";

export enum FontFamily {
    Arial = "Arial, Helvetica, sans-serif",
    Verdana = "Verdana, sans-serif",
    Tahoma = "Tahoma, Verdana, sans-serif",
    TrebuchetMS = "'Trebuchet MS', Helvetica, sans-serif",
    TimesNewRoman = "'Times New Roman', Times, serif",
    Georgia = "Georgia, serif",
    Garamond = "Garamond, serif",
    CourierNew = "'Courier New', Courier, monospace",
    BrushScriptMT = "'Brush Script MT', cursive"
}

export enum FontStyle {
    Normal = "",
    Italic = "italic",
    Oblique = "oblique"
}

export enum FontWeight {
    Normal = 400,
    Bold = 700
}

export interface TextObject extends CanvasObject
{
    content: string;
    fontFamily: FontFamily;
    fontSize: number;
    color: string;
    fontStyle: FontStyle;
    fontWeight: FontWeight;
}