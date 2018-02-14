import {Dimensions, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/styleSheetCreate";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export class Colors {
    static blue = "#01A8FE";
    static darkBlue = "#3D5368";
    static tabBarGray = "gray";
    static tabBarBorder = "black";
    static fontDark = "#4A4A4A";
    static fontGray = "#8A8B8F";
    static white = "#FFFFFF";
    static separatorHeader = "#F4F4F4";
    static modalBackground = "rgba(155,155,155,0.50)";
    static separator = "#ECEBF0";
    static transparent = "rgba(0,0,0,0)";
}

export class CommonStyles {
    static styles = styleSheetCreate({
        flex1: {
            flex: 1
        }
    });
}

export class CommonHeaderStyle {
    static StackHeader = styleSheetCreate({
        headerStyle: {
            backgroundColor: Colors.darkBlue
        } as ViewStyle
    });
}
