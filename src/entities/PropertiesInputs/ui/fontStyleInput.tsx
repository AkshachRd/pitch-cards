interface FontStyleInputProps {
    name?: string;
    onWeightToggle?: () => void;
    isBald: boolean;
    onStyleToggle?: () => void;
    isItalic: boolean;
}

const FontStyleInput = ({name, onStyleToggle, onWeightToggle, isBald, isItalic}: FontStyleInputProps) => {
    return (
        <div className="font-style-input__wrapper">
            {name && <span className="font-style-input__name">{name}</span>}
            <div className="font-style-input__container">
                <button
                    className={`font-style-input__btn font-style-input__style-btn ${isItalic && "font-style-input__btn_active"}`}
                    onClick={() => onStyleToggle && onStyleToggle()}
                >
                    i
                </button>
                <button
                    className={`font-style-input__btn font-style-input__weight-btn ${isBald && "font-style-input__btn_active"}`}
                    onClick={() => onWeightToggle && onWeightToggle()}
                >
                    B
                </button>
            </div>
        </div>
    )
};

export default FontStyleInput;