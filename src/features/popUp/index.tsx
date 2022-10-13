import {ReactNode, MouseEvent} from "react";
import "./styles.css";
import Icon, { IconNames } from "shared/icons";

interface PopUpProps
{
    children: ReactNode;
    onClose: () => void;
}

const PopUp = ({children, onClose}: PopUpProps) => {
    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };

    const closeBtnSize = 25;
    const closeBtnStyle = {
        left: `calc(100% - 20px - ${closeBtnSize}px)`,
    };

    return (
        <div className="popup">
            <div className="popup__box">
                <button className="popup__btn popup__close-btn" onClick={handleClose} style={closeBtnStyle}>
                    <Icon width={closeBtnSize} height={closeBtnSize} color={"black"} name={IconNames.Cross}/>
                </button>
                {children}
            </div>
        </div>
    )
};

export default PopUp;