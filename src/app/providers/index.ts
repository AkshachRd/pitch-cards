import {compose} from "@reduxjs/toolkit";
import {withStore} from "./with-store";
import {withModal} from "./with-modal";
import {ComponentType} from "react";

export const withProviders = compose<ComponentType>(withStore, withModal);