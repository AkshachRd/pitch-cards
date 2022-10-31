import {FontStyle, FontWeight} from "shared/types";
import {useEffect, useReducer} from "react";

interface FontStyleInputProps
{
    onStyleChange: (fontStyle: FontStyle) => void;
    onWeightChange: (fontWeight: FontWeight) => void;
}

const FontStyleInput = ({onStyleChange, onWeightChange}: FontStyleInputProps) => {
    const [fontStyle, toggleFontStyle] = useReducer((fontStyle: FontStyle) => {
        return fontStyle === FontStyle.Normal ? FontStyle.Italic : FontStyle.Normal;
    }, FontStyle.Normal);
    const [fontWeight, toggleFontWeight] = useReducer((fontWeight: FontWeight) => {
        return fontWeight === FontWeight.Normal ? FontWeight.Bold : FontWeight.Normal;
    }, FontWeight.Normal);
    
    useEffect(() => {
        onStyleChange(fontStyle);
    }, [fontStyle, onStyleChange]);

    useEffect(() => {
        onWeightChange(fontWeight);
    }, [fontWeight, onWeightChange]);
    
    return (
        <>
            <div onClick={() => toggleFontStyle()}>I</div>
            <div onClick={() => toggleFontWeight()}>B</div>
        </>
    )
};

export default FontStyleInput;