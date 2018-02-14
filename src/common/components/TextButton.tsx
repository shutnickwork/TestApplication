import React, {PureComponent} from "react";
import {Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {ComponentStyles} from "./componentStyles";

let containerStyle: ViewStyle;
let textStyle: TextStyle;

interface IProps {
    text: string;
    onPress: any;
    isDark: boolean;
}

export class TextButton extends PureComponent<IProps, IEmpty> {

    constructor() {
        super();
    }

    render(): JSX.Element {
        containerStyle = this.props.isDark ? ComponentStyles.button.containerDark : ComponentStyles.button.containerLight;
        textStyle = this.props.isDark ? ComponentStyles.button.textLight : ComponentStyles.button.textDark;

        return (
            <TouchableOpacity style={containerStyle} onPress={this.props.onPress}>
                <Text style={textStyle}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}
