import React, {useReducer} from "react";
import {withProviders} from "./providers";
import Header from "../widgets/header/ui";
import {Canvas} from "../widgets/canvas";
import "./index.css";
import Settings from "../widgets/settings";
import ImageUploader from "features/imageUploader/ui";

const App = () => {
    const [settings, toggleSettings] = useReducer((state) => !state, false);
    const [imageUploader, toggleImageUploader] = useReducer((state) => !state, false);

    const CANVAS_WIDTH = Number(process.env.REACT_APP_CANVAS_WIDTH);
    const CANVAS_HEIGHT = Number(process.env.REACT_APP_CANVAS_HEIGHT);

    return (
        <div className="App">
            <Header>
                <button onClick={(e) => {e.preventDefault(); toggleSettings();}}>Settings</button>
                <button onClick={(e) => {e.preventDefault(); toggleImageUploader();}}>Upload image</button>
            </Header>
            <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
            {settings && <Settings toggle={toggleSettings}/>}
            {imageUploader && <ImageUploader toggle={toggleImageUploader}/>}
        </div>
    )
}

export default withProviders(App);