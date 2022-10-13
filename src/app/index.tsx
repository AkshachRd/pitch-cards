import React, {useReducer} from "react";
import {withProviders} from "./providers";
import Header from "../widgets/header/ui";
import {Canvas} from "../widgets/canvas";
import "./index.css";
import Settings from "../widgets/settings";

const App = () => {
    const [settings, toggleSettings] = useReducer((state) => !state, false);

    const CANVAS_WIDTH = Number(process.env.REACT_APP_CANVAS_WIDTH);
    const CANVAS_HEIGHT = Number(process.env.REACT_APP_CANVAS_HEIGHT);

    return (
        <div className="App">
            <Header toggleSettings={toggleSettings}/>
            <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
            {settings && <Settings toggle={toggleSettings}/>}
        </div>
    )
}

export default withProviders(App);