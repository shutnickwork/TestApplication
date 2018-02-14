import {NavigationAction, NavigationActions, NavigationState, TabNavigator, TabNavigatorConfig} from "react-navigation";
import {TextStyle, ViewStyle} from "react-native";
import {FontNames} from "../core/theme/FontNames";
import {Colors} from "../core/theme/commonStyles";
import {Navigation} from "./Navigation";
import {MainNavigation} from "./tabs/MainNavigation";
import {SecondNavigation} from "./tabs/SecondNavigation";
import {IAppState} from "../core/appState";
import {Action, isType} from "typescript-fsa";
import {CoreActions} from "../core/coreActions";

const tabBarHeight = 49;
const config: TabNavigatorConfig = {
    backBehavior: "none",
    tabBarPosition: "bottom",
    tabBarOptions: {
        activeTintColor: Colors.darkBlue,
        inactiveTintColor: Colors.darkBlue,
        labelStyle: {
            margin: 0,
            marginBottom: 7,
            letterSpacing: 0.5,
            fontFamily: FontNames.regular,
            fontSize: 10,
        } as TextStyle,
        upperCaseLabel: false,
        showLabel: true,
        showIcon: true,
        style: {
            borderTopColor: Colors.tabBarBorder,
            borderTopWidth: 1,
            backgroundColor: Colors.white,
            elevation: 0,
            position: "absolute",
            height: tabBarHeight,
            left: 0,
            right: 0,
            bottom: 0,
        },
        tabStyle: {
            margin: 0,
            padding: 0,
            paddingTop: 0,
            height: tabBarHeight,
            backgroundColor: Colors.white,
        } as ViewStyle,
        indicatorStyle: {
            borderWidth: 0,
            backgroundColor: "transparent"
        } as ViewStyle,
    },
    animationEnabled: false,
    swipeEnabled: false,
    lazy: false,
};

export const MainTabNavigator = TabNavigator({
    [Navigation.Tabs.main]: {screen: MainNavigation},
    [Navigation.Tabs.second]: {screen: SecondNavigation},
}, config);

export const TabNavigationInitialState = MainTabNavigator.router.getStateForAction(NavigationActions.init({}), undefined);

export function tabNavigationReducer(state: NavigationState = TabNavigationInitialState, action: NavigationAction): NavigationState {
    if (isType(action, CoreActions.rehydrate)) {
        const navigationState = (action as Action<IAppState>).payload.navigationState;

        return navigationState.tabsState;
    } else {
        return MainTabNavigator.router.getStateForAction(action, state) || state;
    }
}
