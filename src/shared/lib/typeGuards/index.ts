import {ArtObject, CanvasObject, ImageObject, TextObject} from "../../types";

export const isArtObject = (obj: CanvasObject | ArtObject): obj is ArtObject => {
    return (obj as ArtObject).shape !== undefined &&
        (obj as ArtObject).color !== undefined;
}

export const isImageObject = (obj: CanvasObject | ImageObject): obj is ImageObject => {
    return (obj as ImageObject).source !== undefined;
}

export const isTextObject = (obj: CanvasObject | TextObject): obj is TextObject => {
    return (obj as TextObject).content !== undefined &&
        (obj as TextObject).style !== undefined &&
        (obj as TextObject).fontFamily !== undefined &&
        (obj as TextObject).fontSize !== undefined &&
        (obj as TextObject).color !== undefined;
}