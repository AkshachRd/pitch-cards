import {createAction, Reducer, AnyAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

type HistoryState<S> = {
    past: Array<S>;
    present: S;
    future: Array<S>;
};

export const undo = createAction("history/undo");
export const redo = createAction("history/redo");

const undoable = <S, A extends AnyAction>(reducer: Reducer<S, A>) => {
    const initialState: HistoryState<S> = {
        past: [],
        // TODO: разрешить проблему с ts-ignore
        // @ts-ignore
        present: reducer(undefined, {type: undefined}),
        future: []
    };

    return function (state = initialState, action: A) {
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

export const selectHistory = (state: RootState) => state.history;
export default undoable;