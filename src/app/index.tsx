import React, {useReducer} from "react";
import {withProviders} from "./providers";
import Header from "widgets/header/ui";
import {Canvas} from "widgets/canvas";
import "./index.css";
import Settings from "widgets/settings";
import ImageUploader from "features/imageUploader/ui";
import PropertiesEditor from "../widgets/propertiesEditor";

const App = () => {
    const [settings, toggleSettings] = useReducer((state) => !state, false);
    const [imageUploader, toggleImageUploader] = useReducer((state) => !state, false);

    return (
        <div className="App">
            <Header>
                <button onClick={(e) => {e.preventDefault(); toggleSettings();}}>Settings</button>
                <button onClick={(e) => {e.preventDefault(); toggleImageUploader();}}>Upload image</button>
            </Header>
            <Canvas/>
            {settings && <Settings toggle={toggleSettings}/>}
            {imageUploader && <ImageUploader toggle={toggleImageUploader}/>}
            <PropertiesEditor/>
        </div>
    )
}

export default withProviders(App);