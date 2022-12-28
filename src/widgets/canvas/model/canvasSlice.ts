import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "app/store";
import {Filters, Size} from "shared/types";

export interface CanvasState
{
    width: number;
    height: number;
    filter: Filters;
    title: string;
}

interface ResizePayload extends Size {}
type ChangeTitlePayload = string;

const initialState: CanvasState = {
    title: "New Card",
    filter: Filters.None,
    width: Number(process.env.REACT_APP_CANVAS_WIDTH),
    height: Number(process.env.REACT_APP_CANVAS_HEIGHT),
};

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<Filters>) => {
            state.filter = action.payload;
        },
        resize: (state, action: PayloadAction<ResizePayload>) => {
            state.width = action.payload.width;
            state.height = action.payload.height;
        },
        changeTitle: (state, action: PayloadAction<ChangeTitlePayload>) => {
            state.title = action.payload;
        }
    }
})

export const {
    changeFilter,
    resize,
    changeTitle,
} = canvasSlice.actions;
export const selectCanvasState = (state: RootState) => state.history.present.canvas;
export const selectCanvasSize = (state: RootState) => (({width, height}) =>
    ({width, height}))(state.history.present.canvas);
export default canvasSlice.reducer;