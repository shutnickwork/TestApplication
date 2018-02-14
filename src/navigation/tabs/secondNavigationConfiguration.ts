import {NavigationActions, NavigationState, StackNavigator, StackNavigatorConfig} from "react-navigation";
import {Navigation} from "../Navigation";
import {SecondScreen} from "../../modules/second/SecondScreen";

const config: StackNavigatorConfig = {
    headerMode: "screen"
};

export const SecondStackNavigator = StackNavigator({
    [Navigation.Pages.second]: {screen: SecondScreen},
}, config);

export const SecondNavigationInitialState = SecondStackNavigator.router.getStateForAction(NavigationActions.init({}), undefined);

export function secondNavigationReducer(state: NavigationState = SecondNavigationInitialState, action: any): NavigationState {
    return SecondStackNavigator.router.getStateForAction(action, state) || state;
}
