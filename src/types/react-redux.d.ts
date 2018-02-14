import {Dispatch} from "react-redux";
import {IReduxProps} from "../core/BaseComponent";
import {IAppState} from "../core/appState";

declare module "react-redux" {
    export function connect<IStateProps, IDispatchProps>(selector: (state: IAppState, ownProps?: any) => IReduxProps<IStateProps, {}>,
                                                         dispatch?: (dispatch: Dispatch<IAppState>, ownProps?: any) => IReduxProps<{}, IDispatchProps>): any;
}
