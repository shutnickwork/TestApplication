import {AppRegistry} from "react-native";
import {App} from "./App";

// noinspection JSUnusedGlobalSymbols | used from js code
export function registerApp(): void {
    const rootComponent =  App; // appSettingsProvider.settings.devOptions.showAllComponentsOnStart ? AllComponents :
    AppRegistry.registerComponent("TestApp", () => rootComponent);
}
