import React, {PureComponent} from "react";
import {Image, ImageURISource, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";
import {IAppState} from "../../core/appState";
import {styleSheetCreate} from "../styleSheetCreate";
import {FontNames} from "../../core/theme/FontNames";
import {Colors} from "../../core/theme/commonStyles";

@(connect as any)(null, (dispatch: Dispatch<IAppState>) => ({dispatch}))
export class HeaderTitle extends PureComponent<IHeaderTitleProps, IEmpty> {
    private onPress = (): void => {
        const {action, dispatch} = this.props;
        if (action && dispatch) {
            dispatch(action());
        }
    };

    private headerContainer = (): JSX.Element => {
        const {image, mainText, text} = this.props;
        if (image) {
            return (
                <View style={styles.container}>
                    <Image source={image}/>
                </View>
            );
        } else if (mainText && text) {
            return (
                <View style={styles.container}>
                    <Text style={this.props.textMainStyle || styles.textMain} numberOfLines={1} ellipsizeMode={"tail"}>{mainText}</Text>
                    <Text style={this.props.textMainStyle || styles.text} numberOfLines={1} ellipsizeMode={"tail"}>{text}</Text>
                </View>
            );
        } else if (mainText) {
                return (
                    <View style={styles.container}>
                        <Text style={this.props.textMainStyle || styles.textMain} numberOfLines={1} ellipsizeMode={"tail"}>{mainText}</Text>
                    </View>
                );
        } else {
            return <View/>;
        }
    };

    render(): JSX.Element {
        if (this.props.action) {
            return (
                <TouchableOpacity onPress={this.onPress} style={styles.container}>
                    {this.headerContainer()}
                </TouchableOpacity>
            );
        } else {
            return this.headerContainer();
        }
    }
}

export interface IHeaderTitleProps {
    mainText?: string;
    text?: string;
    image?: ImageURISource;
    dispatch?: Dispatch<IAppState>;
    action?: () => Action;
    textMainStyle?: TextStyle;
}

const styles = styleSheetCreate({
    container: {
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
    textMain: {
        fontFamily: FontNames.regular,
        color: Colors.white,
        fontSize: 16,
        letterSpacing: 0,
        backgroundColor: Colors.transparent
    } as TextStyle,
    text: {
        fontFamily: FontNames.regular,
        color: Colors.fontDark,
        fontSize: 14,
        letterSpacing: 0,
        backgroundColor: Colors.transparent
    } as TextStyle,
});