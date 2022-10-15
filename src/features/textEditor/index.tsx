import {SyntheticEvent} from "react";
import { useAppDispatch } from "shared/hooks";
import { createText } from "shared/lib/canvas";
import { FontFamily, FontStyle } from "shared/types";
import {v4 as uuid4v} from "uuid";
import { add } from "widgets/canvas/model/canvasSlice";

const TextEditor = () => {
    const dispatch = useAppDispatch();

    const submitText = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            content: {value: string},
            color: {value: string},
            fontFamily: {value: FontFamily},
            fontSize: {value: number},
            style: {value: FontStyle}
        };

        const content = target.content.value;
        const color = target.color.value;
        const fontFamily = target.fontFamily.value;
        const fontSize = target.fontSize.value;
        const style = target.style.value;

        const textObj = createText(uuid4v(), content, fontFamily, fontSize, color, style);
        dispatch(add(textObj));
    };

    return (
        <>
            <form onSubmit={submitText}>
                <input type="text" name="content"/>
                <input type="color" name="color"/>
                <select name="fontFamily">
                    {Object.keys(FontFamily).map((fontFamily) => 
                        <option key={fontFamily}>{fontFamily}</option>
                    )}
                </select>
                <input type="number" name="fontSize"/>
                <select name="style">
                    {Object.keys(FontStyle).map((fontStyle) => 
                        <option key={fontStyle}>{fontStyle}</option>
                    )}
                </select>
                <button type="submit">Add</button>
            </form>
        </>
    )
};

export default TextEditor;