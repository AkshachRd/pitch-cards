import {ChangeEvent, MouseEvent, useEffect, useReducer, useState} from "react";
import TextInput from "entities/PropertiesInputs/ui/textInput";
import "./styles.scss";

interface DragNumInputProps
{
    minValue?: number;
    defaultValue?: number;
    value?: number;
    name?: string;
    onChange?: (value: number) => void;
}

const DragNumInput = ({minValue, value, name, defaultValue, onChange}: DragNumInputProps) => {
    const [startPos, setStartPos] = useState(0);
    const [val, setVal] = useState(defaultValue || minValue || 0);
    const [dragging, toggleDragging] = useReducer((state) => !state, false);
    const [disableTyping, setDisableTyping] = useState(false);

    const mouseDown = (e: MouseEvent<HTMLInputElement>) => {
        setDisableTyping(false);
        e.currentTarget.style.cursor = "grabbing";
        e.currentTarget.readOnly = true;
        setStartPos(e.clientY);
        toggleDragging();
    };

    const mouseMove = (e: MouseEvent<HTMLInputElement>) => {
        if (!dragging) return;

        e.preventDefault();
        const currPos = e.clientY;
        const delta: number = Math.ceil(startPos - currPos);
        const newValue: number = +val + +delta;
        if (minValue !== undefined && newValue < minValue)
        {
            setVal(minValue);
            onChange && onChange(minValue);
        }
        else
        {
            setVal(newValue);
            onChange && onChange(newValue);
        }
        setStartPos(currPos);
        setDisableTyping(true);
    };

    const mouseUp = (e: MouseEvent<HTMLInputElement>) => {
        if (!dragging) return;

        e.preventDefault();
        toggleDragging();
        e.currentTarget.style.cursor = "grab";
        e.currentTarget.readOnly = disableTyping;
        !disableTyping && e.currentTarget.select();
    };

    const mouseOut = mouseUp;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = parseInt(e.target.value);
        if (isNaN(inputValue))
        {
            inputValue = minValue || 0;
        }
        setVal(inputValue);
        onChange && onChange(inputValue);
    };

    useEffect(() => {
        value && setVal(value);
    }, [value]);

    return (
        <div className="drag-num-input__wrapper">
            <TextInput
                className={`drag-num-input__input ${disableTyping && "drag-num-input__input_transparent-selection"}`}
                name={name}
                value={val}
                readOnly={true}
                onChange={handleChange}
                onMouseDown={mouseDown}
                onMouseMove={mouseMove}
                onMouseUp={mouseUp}
                onMouseOut={mouseOut}
            />
        </div>
    )
};

export default DragNumInput;