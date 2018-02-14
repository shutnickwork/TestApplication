import {reducerWithInitialState} from "typescript-fsa-reducers";

export interface ISystemState {
    buildNumber: number;
}

export const SystemInitialState: ISystemState = {
    buildNumber: 0
};

export const systemReducer = reducerWithInitialState(SystemInitialState);