import {AsyncStorage} from "react-native";
import {Persistor, persistStore} from "redux-persist";
import {IAppState} from "./appState";
import {Store} from "redux";

export function createPersistor(store: Store<IAppState>, callback: () => void): Persistor {
    return persistStore(store, {
        storage: (AsyncStorage as any),
    }, callback);
}