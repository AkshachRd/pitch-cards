import {
    ArtObject,
    CanvasObject,
    CanvasObjectTypes,
    FontFamily,
    FontStyle,
    FontWeight,
    ImageObject,
    TextObject
} from "../../types";

export const isArtObject = (obj: CanvasObject | ArtObject): obj is ArtObject => {
    return (obj as ArtObject).type === CanvasObjectTypes.ArtObject &&
        (obj as ArtObject).shape !== undefined &&
        (obj as ArtObject).color !== undefined;
}

export const isImageObject = (obj: CanvasObject | ImageObject): obj is ImageObject => {
    return (obj as ImageObject).type === CanvasObjectTypes.Image &&
        (obj as ImageObject).source !== undefined;
}

export const isTextObject = (obj: CanvasObject | TextObject): obj is TextObject => {
    return (obj as TextObject).type === CanvasObjectTypes.Text &&
        (obj as TextObject).content !== undefined &&
        (obj as TextObject).fontStyle !== undefined &&
        (obj as TextObject).fontWeight !== undefined &&
        (obj as TextObject).fontFamily !== undefined &&
        (obj as TextObject).fontSize !== undefined &&
        (obj as TextObject).color !== undefined;
}

export const isFontStyle = (fontStyle: string | FontStyle): fontStyle is FontStyle => {
    return fontStyle in FontStyle;
};

export const isFontFamily = (fontFamily: string | FontFamily): fontFamily is FontFamily => {
    return Object.values(FontFamily).includes(fontFamily as FontFamily);
};

export const isFontWeight = (fontWeight: number | FontStyle): fontWeight is FontWeight => {
    return fontWeight in FontWeight;
};