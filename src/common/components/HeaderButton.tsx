import React, {PureComponent} from "react";
import {Image, ImageURISource, Platform, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {IAppState} from "../../core/appState";
import {styleSheetCreate} from "../styleSheetCreate";
import {Colors} from "../../core/theme/commonStyles";
import {FontNames} from "../../core/theme/FontNames";

@(connect as any)(null, (dispatch: Dispatch<IAppState>) => ({dispatch}))
export class HeaderButton extends PureComponent<IProps, IEmpty> {
    onPress = (): void => {
        const {action, dispatch} = this.props;
        if (action && dispatch) {
            const actions = action();
            if (actions instanceof Array) {
                actions.forEach(i => dispatch(i));
            } else {
                dispatch(actions);
            }
        }
    };

    render(): JSX.Element {
        const {image, text, isRight, isTransparent, iconTintColor} = this.props;
        const style = StyleSheet.flatten([styles.container, isRight ? {paddingLeft: 32} : {paddingRight: 32}, {marginTop: isTransparent && Platform.OS == "ios" ? -20 : 0}]);
        const iconStyle = iconTintColor ? {tintColor: iconTintColor} : undefined;
        if (image) {
            return (
                <TouchableOpacity style={style} onPress={this.onPress}>
                    <Image source={image} style={iconStyle}/>
                </TouchableOpacity>
            );
        } else if (text) {
            return (
                <TouchableOpacity style={styles.textContainer} onPress={this.onPress}>
                    <Text style={styles.text} numberOfLines={1}>{text}</Text>
                </TouchableOpacity>
            );
        } else {
            return <View/>;
        }
    }
}

interface IProps {
    isSearchBar?: boolean;
    isTransparent?: boolean;
    isRight?: boolean;
    dispatch?: Dispatch<IAppState>;
    image?: ImageURISource;
    text?: string;
    action?: () => Action | Action[];
    iconTintColor?: string;
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
    } as ViewStyle,
    textContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
    } as ViewStyle,
    text: {
        fontSize: 16,
        color: Colors.fontGray,
        fontFamily: FontNames.regular,
        letterSpacing: 0,
        backgroundColor: Colors.transparent
    } as TextStyle,
});