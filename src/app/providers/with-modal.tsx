import React from "react";
import ModalProvider from "shared/modalProvider";

export const withModal = (component: () => React.ReactNode) => () => (
    <ModalProvider>
        {component()}
    </ModalProvider>
);