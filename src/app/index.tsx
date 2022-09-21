import React from "react";
import {withProviders} from "./providers";
import Header from "../widgets/header/ui";
import {Canvas} from "../widgets/canvas";
import config from "../config.json";
import "./index.css";

const App = () => (
    <div className="App">
        <Header/>
        <Canvas width={config.canvas.defaultWidth} height={config.canvas.defaultHeight}/>
    </div>
)

export default withProviders(App);