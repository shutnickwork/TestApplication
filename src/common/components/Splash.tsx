import * as React from "react";
import {PureComponent} from "react";
import {Platform, StatusBar, View, ViewStyle} from "react-native";
import {Colors} from "../../core/theme/commonStyles";
import {styleSheetCreate} from "../styleSheetCreate";

export class Splash extends PureComponent<IEmpty, IEmpty> {
    render(): JSX.Element | null {
        if (Platform.OS == "ios") {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlue}/>
                </View>
            );
        } else {
            return null;
        }

    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: "#FEFEFE",
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle
});