import {ChangeEvent, MouseEvent, useEffect, useReducer, useState} from "react";
import "./styles.css";

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

    const mouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.cursor = "grabbing";
        setStartPos(e.clientY);
        toggleDragging();
    };

    const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
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
    };

    const mouseUp = (e: MouseEvent<HTMLDivElement>) => {
        if (!dragging) return;
        e.preventDefault();
        toggleDragging();
        e.currentTarget.style.cursor = "grab";
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
        <input
            className="drag-num-input"
            type="text"
            name={name}
            value={val}
            onChange={handleChange}
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
            onMouseOut={mouseOut}
        />
    )
};

export default DragNumInput;