import {REHYDRATE} from "redux-persist/constants";
import {IAppState} from "./appState";
import {actionCreator} from "../common/actionCreator";

export class CoreActions {
    static rehydrate = actionCreator<IAppState>(REHYDRATE);
}
