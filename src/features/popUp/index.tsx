import {ReactNode, MouseEvent} from "react";
import "./styles.css";

interface PopUpProps
{
    children: ReactNode;
    submitAction: () => void;
    submitValue: string;
    cancelAction: () => void;
    cancelValue: string;
}

const PopUp = ({children, submitAction, submitValue, cancelAction, cancelValue}: PopUpProps) => {
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        submitAction();
    };

    const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cancelAction();
    };

    return (
        <div className="popup">
            <div className="popup__box">
                {children}
                <div className="popup__btn-bar">
                    <button className="popup__btn popup__submit-btn" onClick={handleSubmit}>{submitValue}</button>
                    <button className="popup__btn popup__cancel-btn" onClick={handleCancel}>{cancelValue}</button>
                </div>
            </div>
        </div>
    )
};

export default PopUp;