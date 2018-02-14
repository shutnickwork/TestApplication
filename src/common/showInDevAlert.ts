import {Alert} from "react-native";

export function showInDevAlert(): void {
    Alert.alert("Информация", "Функция находится в разработке");
}