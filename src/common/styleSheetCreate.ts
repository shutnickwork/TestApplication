import {StyleSheet} from "react-native";

export function styleSheetCreate<T>(styles: T): T {
    return StyleSheet.create(styles as any);
}