import {ReduxLoggerOptions} from "redux-logger";

export interface IAppSettings {
    environment: string;
    serverUrl: string;
    loggerUrl: string;
    bugReportApiKey: string;
    useBugReporter: boolean;
    version: string;
    build: number;
    fetchTimeout: number;
    uploadTimeout: number;
    showVersion: boolean;
    devOptions: IDevOptions;
}

interface IDevOptions {
    reduxLogger?: ReduxLoggerOptions;
    reduxLoggerWhiteList?: string[];
    purgeStateOnStart: boolean;
    showAllComponentsOnStart: boolean;
    disableReduxLogger: boolean;
    androidHockeyOptions: IHockeyPublisherOptions;
    iOSHockeyOptions: IHockeyPublisherOptions;
}

interface IHockeyPublisherOptions {
    appId: string;
    apiToken: string;
}
