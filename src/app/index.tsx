import React, {useReducer} from "react";
import {withProviders} from "./providers";
import Header from "widgets/header/ui";
import {Canvas} from "widgets/canvas";
import "./index.css";
import ImageUploader from "features/imageUploader/ui";
import PropertiesEditor from "../widgets/propertiesEditor";

const App = () => {
    const [imageUploader, toggleImageUploader] = useReducer((state) => !state, false);

    return (
        <div className="App">
            <Header>
                <button onClick={(e) => {e.preventDefault(); toggleImageUploader();}}>Upload image</button>
            </Header>
            <Canvas/>
            {imageUploader && <ImageUploader toggle={toggleImageUploader}/>}
            <PropertiesEditor/>
        </div>
    )
}

export default withProviders(App);