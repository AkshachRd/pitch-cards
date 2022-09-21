import {ArtObject, CanvasObject, ImageObject, TextObject} from "../../types";

export const isArtObject = (obj: CanvasObject | ArtObject): obj is ArtObject => {
    return (obj as ArtObject).shape !== undefined;
}

export const isImageObject = (obj: CanvasObject | ImageObject): obj is ImageObject => {
    return (obj as ImageObject).source !== undefined;
}

export const isTextObject = (obj: CanvasObject | TextObject): obj is TextObject => {
    return (obj as TextObject).content !== undefined;
}