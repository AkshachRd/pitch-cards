import {createAction, nanoid, Reducer, AnyAction} from "@reduxjs/toolkit";
import {DocState, RootState} from "app/store";
import {Filters} from "./types";

type HistoryState<S> = {
    past: Array<S>;
    present: S;
    future: Array<S>;
};

export const undo = createAction("history/undo");
export const redo = createAction("history/redo");
export const openDocument = createAction("history/openDocument", function prepare(doc: DocState) {
    return {
        payload: {
            doc,
            id: nanoid(),
            createdAt: new Date().toISOString(),
        }
    };
});
export const newDocument = createAction("history/newDocument");

const undoable = <S>(reducer: Reducer<S, AnyAction>) => {
    const initialState: HistoryState<S> = {
        past: [],
        present: reducer(undefined, {type: undefined}),
        future: []
    };

    return function (state = initialState, action: AnyAction) {
        const { past, present, future } = state;

        switch (action.type) {
            case undo.type:
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);

                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            case redo.type:
                const next = future[0];
                const newFuture = future.slice(1);

                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            case openDocument.type:
                return {
                    past: [],
                    present: action.payload.doc,
                    future: []
                }
            case newDocument.type:
                return {
                    past: [],
                    present: {
                        canvas: {
                            title: "New Card",
                            filter: Filters.None,
                            width: Number(process.env.REACT_APP_CANVAS_WIDTH),
                            height: Number(process.env.REACT_APP_CANVAS_HEIGHT),
                        },
                        canvasObjects: [],
                    },
                    future: [],
                }
            default:
                const newPresent = reducer(present, action);

                if (present === newPresent) {
                    return state;
                }

                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
        }
    }
};

export const selectHistoryState = (state: RootState) => state.history;
export const selectHistoryPresentState = (state: RootState) => state.history.present;
export default undoable;