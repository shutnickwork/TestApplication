import {createLogger, ReduxLoggerOptions} from "redux-logger";
import {applyMiddleware} from "redux";
import {ReduxStack} from "redux-stack";
import {appSettingsProvider} from "../settings/appSettingsProvider";
import * as _ from "lodash";

const options: ReduxLoggerOptions = {
    diff: true,
    collapsed: false,
    predicate: (getState: () => any, action: any): boolean => {
        return __DEV__
            && !appSettingsProvider.settings.devOptions.disableReduxLogger
            && (appSettingsProvider.settings.devOptions.reduxLoggerWhiteList == null
                || appSettingsProvider.settings.devOptions.reduxLoggerWhiteList.length == 0
                || _.find(appSettingsProvider.settings.devOptions.reduxLoggerWhiteList, str => action.type.includes(str)) != null);
    },
};
const logger = createLogger(Object.assign(options, appSettingsProvider.settings.devOptions.reduxLogger));

export const reduxLoggerInit: ReduxStack = {
    enhancers: __DEV__ ? [applyMiddleware(logger)] : []
};
