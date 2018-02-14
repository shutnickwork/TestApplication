import * as React from "react";
import {Component} from "react";
import {store} from "./core/store";
import {Provider} from "react-redux";
import {appSettingsProvider} from "./core/settings/appSettingsProvider";
import {Splash} from "./common/components/Splash";
import {createPersistor} from "./core/createPersistor";
import {RootNavigation} from "./navigation/RootNavigation";
import {UIManager} from "react-native";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export class App extends Component<IEmpty, IState> {
    constructor(props: IEmpty) {
        super(props);
        this.state = {isRehydrated: false};
    }

    componentDidMount(): void {

        const persistor = createPersistor(store, () => {
            this.setState({isRehydrated: true} as IState);
        });

        if (appSettingsProvider.settings.devOptions.purgeStateOnStart) {
            persistor.purge();
        }
    }

    render(): JSX.Element {
        if (this.state.isRehydrated) {
            return (
                <Provider store={store}>
                    <RootNavigation/>
                </Provider>
            );
        } else {
            return <Splash/>;
        }
    }
}

export interface IState {
    isRehydrated: boolean;
}
