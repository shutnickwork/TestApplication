import {NavigationAction, NavigationActions, NavigationState, StackNavigator, StackNavigatorConfig} from "react-navigation";
import {Navigation} from "./Navigation";
import {TabNavigation} from "./TabNavigation";

const config: StackNavigatorConfig = {
    headerMode: "screen"
};

export const RootNavigator = StackNavigator({
    [Navigation.Pages.tabs]: {screen: TabNavigation},
}, config);

export const RootNavigationInitialState = RootNavigator.router.getStateForAction(NavigationActions.init({}), undefined);

export function rootNavigationReducer(state: NavigationState = RootNavigationInitialState, action: NavigationAction): NavigationState {
    return RootNavigator.router.getStateForAction(action, state) || state;
}
