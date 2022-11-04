import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Coords, Rect, Size} from "shared/types";
import {RootState} from "app/store";

interface SelectionState extends Rect {}

interface ResizePayload extends Size {}
interface ChangeCoordsPayload extends Coords {}

const initialState: SelectionState = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
};

export const selectionSlice = createSlice({
    name: "selection",
    initialState,
    reducers: {
        resize: (state, action: PayloadAction<ResizePayload>) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
        },
        changeCoords: (state, action: PayloadAction<ChangeCoordsPayload>) => {
            state.x = action.payload.x;
            state.y = action.payload.y;
        },
        clear: (state) => {
            state.x = 0;
            state.y = 0;
            state.width = 0;
            state.height = 0;
        }
    }
});

export const {resize, changeCoords, clear} = selectionSlice.actions;
export const selectSelection = (state: RootState) => state.selection;
export default selectionSlice.reducer;