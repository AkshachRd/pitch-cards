import {MouseEvent, ChangeEvent, useState, useReducer} from "react";
import { useAppDispatch } from "shared/hooks";
import { createImage } from "shared/lib/canvas";
import { add } from "widgets/canvas/model/canvasSlice";
import {v4 as uuid4v} from "uuid";
import PopUp from "features/popUp";
import { convertToBase64 } from "../lib";

interface ImageUploaderProps
{
    toggle: () => void;
}

const ImageUploader = ({toggle}: ImageUploaderProps) => {
    const dispatch = useAppDispatch();
    const [baseImage, setBaseImage] = useState("");
    const [isError, toggleIsError] = useReducer((state) => !state, false);

    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) throw new Error("File wasn't uploaded");

        const file = files[0];
        const base64 = await convertToBase64(file);
        setBaseImage(base64);
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const image = new Image();
        image.src = baseImage;
        image.onload = () => {
            const img = createImage(uuid4v(), image.naturalWidth, image.naturalHeight, baseImage);
            dispatch(add(img));
            setBaseImage("");
            toggle();
        };
        image.onerror = () => {
            setBaseImage("");
            toggleIsError();
        };
    };

    return (
        <PopUp onClose={toggle}>
            <input type="file" name="file" required={true} onChange={uploadImage} accept=".png, .jpg, .jpeg" />
            <button disabled={!baseImage} onClick={handleSubmit}>Add image</button>
            {isError && <p>Can't load the image!</p>}
        </PopUp>
    )
};

export default ImageUploader;