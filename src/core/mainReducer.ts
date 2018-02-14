import {Action, combineReducers, Reducer} from "redux";
import {tabNavigationReducer} from "../navigation/tabNavigationConfig";
import {mainNavigationReducer} from "../navigation/tabs/mainNavigationConfiguration";
import {secondNavigationReducer} from "../navigation/tabs/secondNavigationConfiguration";
import {AppInitialState, IAppNavigationState, IAppState} from "./appState";
import {rootNavigationReducer} from "../navigation/rootNavigationConfig";
import {CoreActions} from "./coreActions";
import {appSettingsProvider} from "./settings/appSettingsProvider";
import {systemReducer} from "./systemState";
import {articleListReducer} from "../modules/main/articleListReducer";

const navigationReducers: Reducers<IAppNavigationState> = {
    tabsState: tabNavigationReducer,
    secondNavigationState: secondNavigationReducer,
    rootNavigationState: rootNavigationReducer,
    mainNavigationState: mainNavigationReducer
};

const reducers: Reducers<IAppState> = {
    navigationState: combineReducers(navigationReducers),
    systemState: systemReducer,
    articleListState: articleListReducer
};

const combinedReducers = combineReducers<IAppState>(reducers);

export function mainReducer(state: IAppState, action: Action): IAppState {
    if (action.type == CoreActions.rehydrate.type) {
        const rehydratedState = (action as any).payload as IAppState;
        const fromBuild = rehydratedState.systemState && rehydratedState.systemState.buildNumber;

        if (!fromBuild || fromBuild < appSettingsProvider.settings.build) {

            return {
                ...AppInitialState,
                systemState: {
                    ...rehydratedState.systemState,
                    buildNumber: appSettingsProvider.settings.build,
                }
            };
        }
    }

    return combinedReducers(state, action);
}

type Reducers<T> = {
    [P in keyof T]:  Reducer<T[P]>;
    };