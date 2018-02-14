import * as React from "react";
import {BaseComponent} from "../core/BaseComponent";
import {AnyAction} from "typescript-fsa";
import {addNavigationHelpers, NavigationStackScreenOptions, NavigationState} from "react-navigation";
import {IAppState} from "../core/appState";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {MainTabNavigator} from "./tabNavigationConfig";

@((connect as any)((state: IAppState) => ({navigation: state.navigationState.tabsState}), (dispatch: Dispatch<IAppState>) => ({dispatch})))
export class TabNavigation extends BaseComponent<IProps, {}> {
    //noinspection JSUnusedGlobalSymbols || used by react-navigation
    static navigationOptions: NavigationStackScreenOptions = {
        header: null
    };

    render(): JSX.Element {
        const {navigation, dispatch} = this.props;

        if (navigation == null || dispatch == null) {
            throw new Error("incorrect navigation props data");
        }

        const navigationData = {
            dispatch: dispatch,
            state: navigation
        };

        return (
            <MainTabNavigator navigation={addNavigationHelpers(navigationData)}/>
        );
    }
}

interface IProps {
    dispatch?: (action: AnyAction) => boolean;
    navigation?: NavigationState;
}
