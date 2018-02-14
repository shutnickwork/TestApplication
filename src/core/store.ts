import {mainReducer} from "./mainReducer";
import {buildStack} from "redux-stack";
import {createStore} from "redux";
import {thunkInit} from "./init/thunkInit";
import {promiseInit} from "./init/promiseInit";
import {IAppState} from "./appState";
import {reduxLoggerInit} from "./init/reduxLoggerInit";

const {enhancer} = buildStack([
    thunkInit,
    promiseInit,
    reduxLoggerInit]);

export const store = createStore<IAppState>(mainReducer, enhancer);
