import {configureStore} from '@reduxjs/toolkit';
import canvasReducer from 'widgets/canvas/model/canvasSlice';
import selectionReducer from 'widgets/canvas/model/selectionSlice';
import canvasObjectsReducer from "widgets/canvas/model/canvasObjectsSlice";

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    selection: selectionReducer,
    canvasObjects: canvasObjectsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;