import {createContext, ReactNode} from "react";

interface ModalContextState {
    setModal: (modal: ReactNode) => void;
    unsetModal: () => void;
}

const defaultValue: ModalContextState = {
    setModal: () => {},
    unsetModal: () => {}
};

export const ModalContext = createContext<ModalContextState>(defaultValue);