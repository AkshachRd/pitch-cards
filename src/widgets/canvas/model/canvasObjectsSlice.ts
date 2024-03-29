import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CanvasObject, Coords, FontFamily, FontStyle, FontWeight, Size} from "shared/types";
import {isArtObject, isTextObject} from "shared/lib";
import {RootState} from "app/store";
import {v4 as uuid4v} from "uuid";

type CanvasObjectsState = Array<CanvasObject>;

type AddPayload = CanvasObject;
type RemovePayload = string;
type CopyPayload = string;
type BringForwardPayload = string;
type BringToFrontPayload = string;
type SendBackwardPayload = string;
type SendToBackPayload = string;

interface EditCoordsPayload extends Coords {
    id: string;
}

interface ResizePayload extends Size {
    id: string;
}

interface ChangeScalePayload extends Coords {
    id: string;
}

type SelectPayload = string;
type DeselectPayload = string;

interface ChangeColorPayload {
    id: string;
    color: string;
}

interface ChangeFontFamilyPayload {
    id: string;
    fontFamily: FontFamily;
}

interface ChangeFontStylePayload {
    id: string;
    fontStyle: FontStyle;
}

interface ChangeFontSizePayload {
    id: string;
    fontSize: number;
}

interface ChangeFontWeightPayload {
    id: string;
    fontWeight: FontWeight;
}

interface ChangeContentPayload {
    id: string;
    content: string;
}

const initialState: CanvasObjectsState = [];

export const canvasObjectsSlice = createSlice({
    name: "canvasObject",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<AddPayload>) => {
            state.push(action.payload);
        },
        remove: (state, action: PayloadAction<RemovePayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("remove: object with this id doesn't exist");

            state.splice(state.indexOf(obj), 1);
        },
        copy: (state, action: PayloadAction<CopyPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("copy: object with this id doesn't exist");

            state.push({...obj, id: uuid4v(), x: obj.x + 20, y: obj.y + 20, selected: true});
            obj.selected = false;
        },
        bringForward: (state, action: PayloadAction<BringForwardPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("bringForward: object with this id doesn't exist");

            const index = state.indexOf(obj);
            state.splice(index, 1);
            state.splice(index + 1, 0, obj);
        },
        bringToFront: (state, action: PayloadAction<BringToFrontPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("bringToFront: object with this id doesn't exist");

            state.splice(state.indexOf(obj), 1);
            state.push(obj);
        },
        sendBackward: (state, action: PayloadAction<SendBackwardPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("sendBackward: object with this id doesn't exist");

            const index = state.indexOf(obj);
            state.splice(index, 1);
            state.splice(index === 0 ? 0 : index - 1, 0, obj);
        },
        sendToBack: (state, action: PayloadAction<SendToBackPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("sendToBack: object with this id doesn't exist");

            state.splice(state.indexOf(obj), 1);
            state.unshift(obj);
        },
        editCoords: (state, action: PayloadAction<EditCoordsPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("editCoords: object with this id doesn't exist");

            const {x, y} = action.payload;
            obj.x = x;
            obj.y = y;
        },
        resize: (state, action: PayloadAction<ResizePayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("resizeObject: object with this id doesn't exist");

            const {width, height} = action.payload;
            obj.width = width;
            obj.height = height;
        },
        changeScale: (state, action: PayloadAction<ChangeScalePayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("changeScale: object with this id doesn't exist");

            obj.scale = {x: action.payload.x, y: action.payload.y};
        },
        select: (state, action: PayloadAction<SelectPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("select: object with this id doesn't exist");

            obj.selected = true;
        },
        deselect: (state, action: PayloadAction<DeselectPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload);

            if (!obj) throw new Error("deselect: object with this id doesn't exist");

            obj.selected = false;
        },
        deselectAll: (state) => {
            state.forEach((obj) => {
                obj.selected = false;
            });
        },
        changeColor: (state, action: PayloadAction<ChangeColorPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("changeColor: object with this id doesn't exist");
            if (!(isArtObject(obj) || isTextObject(obj)))
                throw new Error("changeColor: only text and art objects have color property");

            obj.color = action.payload.color;
        },
        changeFontFamily: (state, action: PayloadAction<ChangeFontFamilyPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("changeFontFamily: object with this id doesn't exist");
            if (!isTextObject(obj)) throw new Error("changeFontFamily: only text objects have fontFamily property");

            obj.fontFamily = action.payload.fontFamily;
        },
        changeFontStyle: (state, action: PayloadAction<ChangeFontStylePayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("changeFontStyle: object with this id doesn't exist");
            if (!isTextObject(obj)) throw new Error("changeFontStyle: only text objects have fontStyle property");

            obj.fontStyle = action.payload.fontStyle;
        },
        changeFontSize: (state, action: PayloadAction<ChangeFontSizePayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("changeFontSize: object with this id doesn't exist");
            if (!isTextObject(obj)) throw new Error("changeFontSize: only text objects have fontSize property");

            obj.fontSize = action.payload.fontSize;
        },
        changeFontWeight: (state, action: PayloadAction<ChangeFontWeightPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("changeFontWeight: object with this id doesn't exist");
            if (!isTextObject(obj)) throw new Error("changeFontWeight: only text objects have fontWeight property");

            obj.fontWeight = action.payload.fontWeight;
        },
        changeContent: (state, action: PayloadAction<ChangeContentPayload>) => {
            const obj = state.find((obj) => obj.id === action.payload.id);

            if (!obj) throw new Error("changeContent: object with this id doesn't exist");
            if (!isTextObject(obj)) throw new Error("changeContent: only text objects have content property");

            obj.content = action.payload.content;
        },
    }
});

export const {
    add,
    remove,
    copy,
    bringForward,
    bringToFront,
    sendBackward,
    sendToBack,
    editCoords,
    resize,
    changeScale,
    select,
    deselect,
    deselectAll,
    changeColor,
    changeFontFamily,
    changeFontSize,
    changeFontStyle,
    changeFontWeight,
    changeContent
} = canvasObjectsSlice.actions;
export const selectCanvasObjectsState = (state: RootState): Array<CanvasObject> => state.history.present.canvasObjects;
export default canvasObjectsSlice.reducer;