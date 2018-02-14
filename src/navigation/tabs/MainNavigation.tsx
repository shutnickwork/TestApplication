import * as React from "react";
import {AnyAction} from "typescript-fsa";
import {addNavigationHelpers, NavigationState, NavigationTabScreenOptions} from "react-navigation";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {BaseComponent} from "../../core/BaseComponent";
import {IAppState} from "../../core/appState";
import {TabBarIcon} from "../../common/components/TabBarIcon";
import {MainStackNavigator} from "./mainNavigationConfiguration";
import {ImageResources} from "../../common/ImageResources.g";

@((connect as any)((state: IAppState) => ({navigation: state.navigationState.mainNavigationState}),
    (dispatch: Dispatch<IAppState>) => ({dispatch})))
export class MainNavigation extends BaseComponent<IProps, {}> {
    //noinspection JSUnusedGlobalSymbols || used by react-navigation
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({focused}): JSX.Element => {
            const icon = ImageResources.tab_home_non_active;
            const iconActive = ImageResources.tab_home_active;

            return <TabBarIcon isFocused={focused} imageSource={icon} imageActiveSource={iconActive}/>;
        },
        tabBarLabel: "Главный"
    };

    render(): JSX.Element {
        if (this.props.navigation == null || this.props.dispatch == null) {
            throw new Error("incorrect navigation props data");
        }

        const navigationData = {
            dispatch: this.props.dispatch,
            state: this.props.navigation
        };

        return <MainStackNavigator navigation={addNavigationHelpers(navigationData)}/>;
    }
}

interface IProps {
    dispatch?: (action: AnyAction) => boolean;
    navigation?: NavigationState;
}
