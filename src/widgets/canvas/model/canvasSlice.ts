import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CanvasObject} from "shared/types/canvasObject";
import {RootState} from "app/store";
import {Filters} from "shared/types";
import {isArtObject} from "../../../shared/lib/typeGuards";

export interface CanvasState
{
    filter: Filters;
    objects: Array<CanvasObject>;
}

export interface EditCoordsPayload
{
    index: number;
    x: number;
    y: number;
}

interface SetObjectSelectionByIdPayload
{
    id: string;
    selected: boolean;
}

const initialState: CanvasState = {
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
        editCoords: (state, action: PayloadAction<Array<EditCoordsPayload>>) => {
            action.payload.forEach(({index, x, y}) => {
                state.objects[index].x = x;
                state.objects[index].y = y;
            });
        },
        editColor: (state, action: PayloadAction<string>) => {
            state.objects.forEach((obj) => {
                if (obj.selected && isArtObject(obj))
                {
                    obj.color = action.payload;
                }
            });
        },
        setObjectSelectionById: (state, action: PayloadAction<SetObjectSelectionByIdPayload>) => {
            const obj = state.objects.find((obj) => obj.id === action.payload.id);
            if (obj)
            {
                obj.selected = action.payload.selected;
            }
        }
    }
})

export const {add, remove, editCoords, editColor, setObjectSelectionById, changeFilter} = canvasSlice.actions;
export const selectCanvasObjects = (state: RootState) => state.canvas.objects;
export const selectCanvasState = (state: RootState) => state.canvas;
export const selectCanvasFilter = (state: RootState) => state.canvas.filter;
export default canvasSlice.reducer;