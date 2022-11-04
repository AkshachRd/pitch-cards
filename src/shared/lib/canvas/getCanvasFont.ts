import {FontFamily, FontStyle, FontWeight} from "shared/types";

export const getCanvasFont = (
    fontStyle: FontStyle,
    fontWeight: FontWeight,
    fontSize: number,
    fontFamily: FontFamily
): string => {
    return `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
};