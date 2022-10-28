import {SyntheticEvent} from "react";
import {useAppDispatch} from "shared/hooks";
import {createText} from "shared/lib/canvas";
import {FontFamily, FontStyle, FontWeight} from "shared/types";
import {v4 as uuid4v} from "uuid";
import {add} from "widgets/canvas/model/canvasSlice";
import {getFontFamilyName} from "shared/lib";

const TextEditor = () => {
    const dispatch = useAppDispatch();

    const submitText = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            content: {value: string},
            color: {value: string},
            fontFamily: {value: FontFamily},
            fontSize: {value: number},
            fontStyle: {value: FontStyle},
            fontWeight: {value: FontWeight}
        };

        const content = target.content.value;
        const color = target.color.value;
        const fontFamily = target.fontFamily.value;
        const fontSize = target.fontSize.value;
        const fontStyle = target.fontStyle.value;
        const fontWeight = target.fontWeight.value;

        const textObj = createText(uuid4v(), content, fontFamily, fontSize, color, fontStyle, fontWeight);
        dispatch(add(textObj));
    };

    return (
        <>
            <form onSubmit={submitText}>
                <input type="text" name="content"/>
                <input type="color" name="color"/>
                <select name="fontFamily">
                    {Object.values(FontFamily).map((fontFamily) => {
                        const fontName = getFontFamilyName(fontFamily);
                        return <option key={fontName} value={fontFamily}>{fontName}</option>;
                    })}
                </select>
                <input type="number" name="fontSize" defaultValue={12}/>
                <select name="fontStyle">
                    <option value={FontStyle.Normal}>Normal</option>
                    <option value={FontStyle.Italic}>Italic</option>
                </select>
                <select name="fontWeight">
                    <option value={FontWeight.Normal}>Normal</option>
                    <option value={FontWeight.Bold}>Bold</option>
                </select>
                <button type="submit">Add</button>
            </form>
        </>
    )
};

export default TextEditor;