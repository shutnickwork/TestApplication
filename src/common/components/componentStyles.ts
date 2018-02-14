import {StyleSheet, TextStyle, ViewStyle} from "react-native";
import {FontNames} from "../../core/theme/FontNames";
import {styleSheetCreate} from "../styleSheetCreate";
import {Colors} from "../../core/theme/commonStyles";

const BaseStyles = {
    baseButtonContainer: {
        height: 47,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,

    baseButtonText: {
        fontFamily: FontNames.regular,
        fontSize: 18,
        textAlign: "center",
    } as TextStyle,
};

export const ComponentStyles = {
    button: styleSheetCreate({
        containerDark: StyleSheet.flatten([BaseStyles.baseButtonContainer, {backgroundColor: Colors.fontDark}]),
        containerLight: StyleSheet.flatten([BaseStyles.baseButtonContainer, {backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.fontDark}]),
        textDark: StyleSheet.flatten([BaseStyles.baseButtonText, {color: Colors.fontDark}]),
        textLight: StyleSheet.flatten([BaseStyles.baseButtonText, {color: Colors.white}]),
    }),
};