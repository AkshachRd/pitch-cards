import {combineReducers, configureStore} from '@reduxjs/toolkit';
import canvasReducer from 'widgets/canvas/model/canvasSlice';
import selectionReducer from 'widgets/canvas/model/selectionSlice';
import canvasObjectsReducer from "widgets/canvas/model/canvasObjectsSlice";
import undoable from "shared/history";

export const store = configureStore({
  reducer: {
    history: undoable(combineReducers({
      canvas: canvasReducer,
      canvasObjects: canvasObjectsReducer
    })),
    selection: selectionReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;