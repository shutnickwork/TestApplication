import {Platform} from "react-native";

export class FontNames {
    static regular = Platform.OS == "ios" ? "SFUIText-Regular" : "Roboto-Regular";
    static medium = Platform.OS == "ios" ? "SFUIText-Medium" : "Roboto-Medium";
}