import {FontFamily, FontWeight, FontStyle, TextObject} from "shared/types";
import {getFontFamilyName, isFontFamily} from "shared/lib";
import DragNumInput from "features/dragNumInput";
import {ChangeEvent, useEffect, useState} from "react";
import {
    changeColor, changeContent,
    changeFontFamily,
    changeFontSize,
    changeFontStyle,
    changeFontWeight
} from "widgets/canvas/model/canvasObjectsSlice";
import {useAppDispatch} from "shared/hooks/redux";
import TextInput from "entities/PropertiesInputs/ui/textInput";
import ColorInput from "entities/PropertiesInputs/ui/colorInput";
import Select from "entities/PropertiesInputs/ui/select";
import FontStyleInput from "entities/PropertiesInputs/ui/fontStyleInput";

interface TextObjectPropertiesEditorProps
{
    textObj: TextObject;
}

const TextObjectPropertiesEditor = ({textObj}: TextObjectPropertiesEditorProps) => {
    const dispatch = useAppDispatch();

    const [content, setContent] = useState(textObj.content);
    const [fontFamily, setFontFamily] = useState(textObj.fontFamily);
    const [fontSize, setFontSize] = useState(textObj.fontSize);
    const [fontStyle, setFontStyle] = useState(textObj.fontStyle);
    const toggleFontStyle = () => {
        if (fontStyle === FontStyle.Normal) {
            setFontStyle(FontStyle.Italic);
            return;
        }
        setFontStyle(FontStyle.Normal);
    };
    const [fontWeight, setFontWeight] = useState(textObj.fontWeight);
    const toggleFontWeight = () => {
        if (fontWeight === FontWeight.Normal) {
            setFontWeight(FontWeight.Bold);
            return;
        }
        setFontWeight(FontWeight.Normal);
    };
    const [color, setColor] = useState(textObj.color);

    const id = textObj.id;

    useEffect(() => {
        setContent(textObj.content);
    }, [textObj.content]);

    useEffect(() => {
        setFontFamily(textObj.fontFamily);
    }, [textObj.fontFamily]);

    useEffect(() => {
        setFontSize(textObj.fontSize);
    }, [textObj.fontSize]);

    useEffect(() => {
        setColor(textObj.color);
    }, [textObj.color]);

    useEffect(() => {
        setFontWeight(textObj.fontWeight);
    }, [textObj.fontWeight]);

    useEffect(() => {
        setFontStyle(textObj.fontStyle);
    }, [textObj.fontStyle]);

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

    useEffect(() => {
        dispatch(changeContent({id, content}))
    }, [content]);

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const fontFamily = e.target.value;
        if (!isFontFamily(fontFamily)) throw new Error("Unknown font family");
        setFontFamily(fontFamily);
    };

    return (
        <>
            <TextInput name="Content" value={content} onChange={(e) => setContent(e.target.value)}/>
            <Select name="Font" value={fontFamily} onChange={handleFontFamilyChange}>
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
            </Select>
            <DragNumInput
                name="Size"
                minValue={6}
                defaultValue={fontSize}
                onChange={(fontSize) => setFontSize(fontSize)}
            />
            <FontStyleInput
                name="Style"
                onStyleToggle={toggleFontStyle}
                isItalic={fontStyle === FontStyle.Italic}
                onWeightToggle={toggleFontWeight}
                isBald={fontWeight === FontWeight.Bold}
            />
            <ColorInput name="Color" value={color} onChange={(e) => setColor(e.target.value)}/>
        </>
    );
};

export default TextObjectPropertiesEditor;