import * as React from "react";
import {AnyAction} from "typescript-fsa";
import {addNavigationHelpers, NavigationState, NavigationTabScreenOptions} from "react-navigation";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {BaseComponent} from "../../core/BaseComponent";
import {IAppState} from "../../core/appState";
import {TabBarIcon} from "../../common/components/TabBarIcon";
import {SecondStackNavigator} from "./secondNavigationConfiguration";
import {ImageResources} from "../../common/ImageResources.g";

@((connect as any)((state: IAppState) => ({navigation: state.navigationState.secondNavigationState}),
    (dispatch: Dispatch<IAppState>) => ({dispatch})))
export class SecondNavigation extends BaseComponent<IProps, {}> {
    //noinspection JSUnusedGlobalSymbols || used by react-navigation
    static navigationOptions: NavigationTabScreenOptions = {
        tabBarIcon: ({focused}): JSX.Element => {
            const icon = ImageResources.tab_profile_non_active;
            const iconActive = ImageResources.tab_profile_active;

            return <TabBarIcon isFocused={focused} imageSource={icon} imageActiveSource={iconActive}/>;
        },
        tabBarLabel: "Второй",
    };

    render(): JSX.Element {
        if (this.props.navigation == null || this.props.dispatch == null) {
            throw new Error("incorrect navigation props data");
        }

        const navigationData = {
            dispatch: this.props.dispatch,
            state: this.props.navigation
        };

        return <SecondStackNavigator navigation={addNavigationHelpers(navigationData)}/>;
    }
}

interface IProps {
    dispatch?: (action: AnyAction) => boolean;
    navigation?: NavigationState;
}
