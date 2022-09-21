import {Provider} from "react-redux";
import index from "app/store";
import React from "react";

export const withStore = (component: () => React.ReactNode) => () => (
    <Provider store={index}>
        {component()}
    </Provider>
);