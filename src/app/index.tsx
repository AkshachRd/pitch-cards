import React from "react";
import {withProviders} from "./providers";
import Header from "widgets/header/ui";
import {Canvas} from "widgets/canvas";
import "./index.css";
import PropertiesEditor from "widgets/propertiesEditor";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <Canvas/>
            <PropertiesEditor/>
        </div>
    )
}

export default withProviders(App);