import {ThunkAction} from "redux-thunk";
import {IAppState} from "../core/appState";

export type SimpleThunk = ThunkAction<void, IAppState, Error>;