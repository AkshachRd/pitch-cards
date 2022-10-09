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

type Index = number;

export interface EditCoordsPayload
{
    index: Index;
    x: number;
    y: number;
}

export interface ResizePayload
{
    index: Index;
    width: number;
    height: number;
}

type SelectPayload = Index;
type DeselectPayload = Index;

interface ChangeScalePayload
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
};

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<CanvasObject>) => {
            state.objects.push(action.payload);
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
                const obj = state.objects[index];
                if (obj)
                {
                    obj.x = x;
                    obj.y = y;
                }
            });
        },
        editCoordsByIndex: (state, action: PayloadAction<EditCoordsPayload>) => {
            const obj = state.objects[action.payload.index];
            if (obj)
            {
                obj.x = action.payload.x;
                obj.y = action.payload.y;
            }
        },
        resize: (state, action: PayloadAction<ResizePayload>) => {
            const obj = state.objects[action.payload.index];
            if (obj)
            {
                obj.width = action.payload.width;
                obj.height = action.payload.height;
            }
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
        },
        deselectObjects: (state) => {
            state.objects.forEach((obj) => {
                obj.selected = false;
            });
        },
        select: (state, action: PayloadAction<SelectPayload>) => {
            const obj = state.objects[action.payload];
            if (obj)
            {
                obj.selected = true;
            }
        },
        deselect: (state, action: PayloadAction<DeselectPayload>) => {
            const obj = state.objects[action.payload];
            if (obj)
            {
                obj.selected = false;
            }
        },
        changeScale: (state, action: PayloadAction<ChangeScalePayload>) => {
            const obj = state.objects[action.payload.index];
            if (obj)
            {
                obj.scale = {x: action.payload.x, y: action.payload.y};
            }
        }
    }
})

export const {
    add,
    remove,
    editCoords,
    editCoordsByIndex,
    resize,
    editColor,
    deselectObjects,
    setObjectSelectionById,
    changeScale,
    changeFilter,
    select,
    deselect
} = canvasSlice.actions;
export const selectCanvasObjects = (state: RootState) => state.canvas.objects;
export const selectCanvasState = (state: RootState) => state.canvas;
export const selectCanvasFilter = (state: RootState) => state.canvas.filter;
export default canvasSlice.reducer;