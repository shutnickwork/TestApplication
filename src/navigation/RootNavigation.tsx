import * as React from "react";
import {BaseComponent} from "../core/BaseComponent";
import {AnyAction} from "typescript-fsa";
import {addNavigationHelpers, NavigationState} from "react-navigation";
import {IAppState} from "../core/appState";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootNavigator} from "./rootNavigationConfig";
import {BackHandler, StatusBar, View} from "react-native";
import {Colors} from "../core/theme/commonStyles";

@((connect as any)((state: IAppState) => ({navigation: state.navigationState.rootNavigationState}), (dispatch: Dispatch<IAppState>) => ({dispatch})))
export class RootNavigation extends BaseComponent<IProps, IEmpty> {

    componentDidMount(): void {
        BackHandler.addEventListener("hardwareBackPress", this.onBack);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack);
    }

    onBack = (): boolean => {
        return false;
    };

    render(): JSX.Element {
        if (this.props.navigation == null || this.props.dispatch == null) {
            throw new Error("incorrect navigation props data");
        }

        const navigationData = {
            dispatch: this.props.dispatch,
            state: this.props.navigation
        };

        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlue}/>
                <RootNavigator navigation={addNavigationHelpers(navigationData)}/>
            </View>
        );
    }
}

interface IProps {
    dispatch?: (action: AnyAction) => boolean;
    navigation?: NavigationState;
}
