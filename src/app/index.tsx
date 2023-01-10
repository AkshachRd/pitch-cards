import React from "react";
import {withProviders} from "./providers";
import Header from "widgets/header/ui";
import {Canvas} from "widgets/canvas";
import "./index.scss";
import {PropertiesEditor} from "widgets/propertiesEditor";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="App__container-wrapper">

                <div className="App__container">
                    <Canvas/>
                    <PropertiesEditor/>
                </div>
            </div>

        </div>
    )
}

export default withProviders(App);