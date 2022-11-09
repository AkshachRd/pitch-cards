import {FontFamily, TextObject} from "shared/types";
import {getFontFamilyName, isFontFamily} from "shared/lib";
import DragNumInput from "entities/dragNumInput";
import ColorPicker from "../../../entities/colorPicker";
import {ChangeEvent, useEffect, useState} from "react";
import {
    changeColor,
    changeFontFamily,
    changeFontSize,
    changeFontStyle,
    changeFontWeight
} from "widgets/canvas/model/canvasObjectsSlice";
import {useAppDispatch} from "shared/hooks";
import FontStyleInput from "entities/fontStyleInput";

interface TextObjectPropertiesEditorProps
{
    textObj: TextObject;
}

const TextObjectPropertiesEditor = ({textObj}: TextObjectPropertiesEditorProps) => {
    const dispatch = useAppDispatch();

    const [fontFamily, setFontFamily] = useState(textObj.fontFamily);
    const [fontSize, setFontSize] = useState(textObj.fontSize);
    const [fontStyle, setFontStyle] = useState(textObj.fontStyle);
    const [fontWeight, setFontWeight] = useState(textObj.fontWeight);
    const [color, setColor] = useState(textObj.color);

    const id = textObj.id;

    useEffect(() => {
        dispatch(changeColor({id, color}))
    }, [color]);

    useEffect(() => {
        dispatch(changeFontFamily({id, fontFamily}));
    }, [fontFamily]);

    useEffect(() => {
        dispatch(changeFontStyle({id, fontStyle}));
    }, [fontStyle]);

    useEffect(() => {
        dispatch(changeFontWeight({id, fontWeight}));
    }, [fontWeight]);

    useEffect(() => {
        dispatch(changeFontSize({id, fontSize}));
    }, [fontSize]);

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const fontFamily = e.target.value;
        if (!isFontFamily(fontFamily)) throw new Error("Unknown font family");
        setFontFamily(fontFamily);
    };

    return (
        <>
            <select name="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
                {Object.values(FontFamily).map((fontFamily) => {
                    const fontFamilyName = getFontFamilyName(fontFamily);
                    return (
                        <option
                            key={fontFamilyName}
                            value={fontFamily}
                        >
                            {fontFamilyName}
                        </option>
                    );
                })}
            </select>
            <DragNumInput
                name="fontSize"
                minValue={6}
                defaultValue={fontSize}
                onChange={(fontSize) => setFontSize(fontSize)}
            />
            <FontStyleInput
                onStyleChange={(fontStyle) => setFontStyle(fontStyle)}
                onWeightChange={(fontWeight) => setFontWeight(fontWeight)}
            />
            <ColorPicker name="textColor" onChange={(color) => setColor(color)}/>
        </>
    );
};

export default TextObjectPropertiesEditor;