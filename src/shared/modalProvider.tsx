import {ReactNode, useCallback, useState} from "react";
import {ModalContext} from "widgets/modal";
import Modal from "widgets/modal/ui";

interface ModalProviderProps {
    children: ReactNode;
}

const ModalProvider = ({children}: ModalProviderProps) => {
    const [modal, setModal] = useState<ReactNode>(null);
    const unsetModal = useCallback(() => {
        setModal(null);
    }, []);

    return (
        <ModalContext.Provider value={{unsetModal, setModal}}>
            {children}
            {modal && <Modal modal={modal} unsetModal={unsetModal}/>}
        </ModalContext.Provider>
    )
};

export default ModalProvider;