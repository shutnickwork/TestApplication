import * as React from "react";

export abstract class BaseComponent<TP, TS> extends React.Component<TP, TS> {
    //noinspection JSUnusedGlobalSymbols used by React
    state: TS;
    props: TP;

    constructor(props?: TP) {
        super(props);
    }

    //noinspection JSUnusedGlobalSymbols used by React
    componentDidMount(): void {// tslint:disable-line
    }

    //noinspection JSUnusedGlobalSymbols used by React
    componentWillMount(): void {// tslint:disable-line
    }

    //noinspection JSUnusedGlobalSymbols used by React
    componentWillUnmount(): void {// tslint:disable-line
    }
}

// noinspection JSUnusedGlobalSymbols | public api
export abstract class BaseReduxComponent<TP, TSP, TDP, TS> extends BaseComponent<TP, TS> {
//noinspection JSUnusedGlobalSymbols used by React
    constructor(props: TP) {
        super(props);
    }

//noinspection JSUnusedGlobalSymbols used by React
    get dispatchProps(): TDP {
        return (this.props as any).dispatchProps;
    }

//noinspection JSUnusedGlobalSymbols used by React
    get stateProps(): TSP {
        return (this.props as any).stateProps;
    }
}
//noinspection JSUnusedGlobalSymbols used by React
export interface IReduxProps<TStateProps, TDispatchProps> {
    readonly stateProps?: TStateProps;
    readonly dispatchProps?: TDispatchProps;
}
