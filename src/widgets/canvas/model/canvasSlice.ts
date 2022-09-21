import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CanvasObject, CanvasObjectTypes} from "shared/types/canvasObject";
import {RootState} from "app/store";
import {ArtObject, Filters} from "shared/types";

export interface CanvasState
{
    currentObjectIndex: number | null;
    filter: Filters;
    objects: Array<CanvasObject>;
}

interface EditCoordsPayload
{
    id: string;
    x: number;
    y: number;
}

const initialState: CanvasState = {
    currentObjectIndex: null,
    filter: Filters.None,
    objects: []
}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<CanvasObject>) => {
            state.objects.unshift(action.payload);
        },
        remove: (state, action: PayloadAction<string>) => {
            state.objects = state.objects.filter((obj) => {
                return obj.id !== action.payload;
            })
        },
        changeFilter: (state, action: PayloadAction<Filters>) => {
            state.filter = action.payload;
        },
        editCoords: (state, action: PayloadAction<EditCoordsPayload>) => {
            const currObj = state.objects.find((obj) => obj.id === action.payload.id);
            if (!currObj) throw new Error('Can\'t edit object\' coords');
            currObj.x = action.payload.x;
            currObj.y = action.payload.y;
        },
        editColor: (state, action: PayloadAction<string>) => {
            if (state.currentObjectIndex === null) throw new Error('Object is not selected');
            if (state.objects[state.currentObjectIndex].type !== CanvasObjectTypes.ArtObject)
                throw new Error('Color changing can be applied only to art objects');
            const obj = state.objects[state.currentObjectIndex] as ArtObject;
            obj.color = action.payload;
        },
        setCurrentObjectIndex: (state, action: PayloadAction<number | null>) => {
            state.currentObjectIndex = action.payload;
        }
    }
})

export const {add, remove, editCoords, editColor, setCurrentObjectIndex, changeFilter} = canvasSlice.actions;
export const selectCanvasObjects = (state: RootState) => state.canvas.objects;
export const selectCanvasState = (state: RootState) => state.canvas;
export const selectCanvasFilter = (state: RootState) => state.canvas.filter;
export default canvasSlice.reducer;