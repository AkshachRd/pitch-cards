import {MouseEvent, ChangeEvent, useState, useReducer} from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/redux";
import { createImage } from "shared/lib/canvas";
import {resize, selectCanvasSize} from "widgets/canvas/model/canvasSlice";
import {v4 as uuid4v} from "uuid";
import { convertToBase64, isImgBiggerThanCanvas } from "../lib";
import {add} from "widgets/canvas/model/canvasObjectsSlice";

interface ImageUploaderProps
{
    toggle: () => void;
}

const ImageUploader = ({toggle}: ImageUploaderProps) => {
    const dispatch = useAppDispatch();
    const [baseImage, setBaseImage] = useState("");
    const [imageBiggerThanCanvas, toggleImageBiggerThanCanvas] = useReducer((state) => !state, false);
    const [isError, toggleIsError] = useReducer((state) => !state, false);
    const {width: canvasWidth, height: canvasHeight} = useAppSelector(selectCanvasSize);
    const [currImg, setCurrImg] = useState<HTMLImageElement | null>(null);

    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) throw new Error("File wasn't uploaded");

        const file = files[0];
        const base64 = await convertToBase64(file);
        setBaseImage(base64);
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const img = new Image();
        img.src = baseImage;
        img.onload = () => {
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            if (isImgBiggerThanCanvas(imgWidth, imgHeight, canvasWidth, canvasHeight))
            {
                toggleImageBiggerThanCanvas();
                setCurrImg(img);
            }
            else
            {
                const imgObj = createImage(uuid4v(), imgWidth, imgHeight, baseImage);
                dispatch(add(imgObj));
                toggle();
            }
        };
        img.onerror = () => {
            setBaseImage("");
            toggleIsError();
        };
    };

    const enlargeCanvas = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!currImg) throw new Error("currImg is not assigned");

        const img = createImage(uuid4v(), currImg.naturalWidth, currImg.naturalHeight, baseImage);
        dispatch(resize({width: currImg.naturalWidth, height: currImg.naturalHeight}));
        dispatch(add(img));
        toggle();
    };

    const keepCanvas = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!currImg) throw new Error("currImg is not assigned");

        const imgObj = createImage(uuid4v(), currImg.naturalWidth, currImg.naturalHeight, baseImage);
        dispatch(add(imgObj));
        toggle();
    };

    return (
        <>
            <input type="file" name="file" required={true} onChange={uploadImage} accept=".png, .jpg, .jpeg" />
            <button disabled={!baseImage || isError} onClick={handleSubmit}>Add image</button>
            {isError && <p>Can't load the image!</p>}
            {imageBiggerThanCanvas  && 
            <div>
                <button onClick={enlargeCanvas}>Enlarge canvas</button>
                <button onClick={keepCanvas}>Keep canvas</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    toggle();
                }}
                >
                    Close
                </button>
            </div>}
        </>
    )
};

export default ImageUploader;