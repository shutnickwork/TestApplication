import {NavigationActions, NavigationState, StackNavigator, StackNavigatorConfig} from "react-navigation";
import {Navigation} from "../Navigation";
import {AnyAction} from "redux";
import {Action, isType} from "typescript-fsa";
import {CoreActions} from "../../core/coreActions";
import {IAppState} from "../../core/appState";
import {ArticleList} from "../../modules/main/ArticleList";
import {ArticleDetails} from "../../modules/main/components/ArticleDetails";

const config: StackNavigatorConfig = {};

export const MainStackNavigator = StackNavigator({
    [Navigation.Pages.mainPage]: {screen: ArticleList},
    [Navigation.Pages.articleDetails]: {screen: ArticleDetails}
}, config);

export const MainNavigationInitialState = MainStackNavigator.router.getStateForAction(NavigationActions.init({}), undefined);

export function mainNavigationReducer(state: NavigationState = MainNavigationInitialState, action: AnyAction): NavigationState {
    if (isType(action, CoreActions.rehydrate)) {
        const navigationState = (action as Action<IAppState>).payload.navigationState;

        return navigationState && navigationState.mainNavigationState || state;
    } else {
        return MainStackNavigator.router.getStateForAction(action, state) || state;
    }
}
