import {ReactNode, useEffect} from "react";
import Icon, {IconNames} from "shared/icons";
import "./styles.css";

interface ModalProps {
    modal: ReactNode;
    unsetModal: () => void;
}

const Modal = ({modal, unsetModal}: ModalProps) => {
    useEffect(() => {
        const bind = (e: KeyboardEvent) => {
            if (e.key !== "Escape") {
                unsetModal();
            }
        };

        document.addEventListener("keyup", bind);
        return () => {
            document.removeEventListener("keyup", bind);
        };
    }, [modal, unsetModal]);

    const closeBtnSize = 25;
    const closeBtnStyle = {
        left: `calc(100% - 20px - ${closeBtnSize}px)`,
    };

    return (
        <div className="modal">
            <div className="modal__box">
                <button className="modal__btn modal__close-btn" onClick={unsetModal} style={closeBtnStyle}>
                    <Icon width={closeBtnSize} height={closeBtnSize} color={"black"} name={IconNames.Cross}/>
                </button>
                {modal}
            </div>
        </div>
    )
};

export default Modal;