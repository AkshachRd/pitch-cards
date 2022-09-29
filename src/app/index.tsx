import React, {useReducer} from "react";
import {withProviders} from "./providers";
import Header from "../widgets/header/ui";
import {Canvas} from "../widgets/canvas";
import config from "../config.json";
import "./index.css";
import Settings from "../widgets/settings";

const App = () => {
    const [settings, toggleSettings] = useReducer((state) => !state, false);

    return (
        <div className="App">
            <Header toggleSettings={toggleSettings}/>
            <Canvas width={config.canvas.defaultWidth} height={config.canvas.defaultHeight}/>
            {settings && <Settings toggle={toggleSettings}/>}
        </div>
    )
}

export default withProviders(App);