import {NavigationState} from "react-navigation";
import {RootNavigationInitialState} from "../navigation/rootNavigationConfig";
import {SecondNavigationInitialState} from "../navigation/tabs/secondNavigationConfiguration";
import {TabNavigationInitialState} from "../navigation/tabNavigationConfig";
import {MainNavigationInitialState} from "../navigation/tabs/mainNavigationConfiguration";
import {ISystemState, SystemInitialState} from "./systemState";
import {ArticleListInitialState, IArticleListState} from "../modules/main/articleListState";

export interface IAppState {
    navigationState: IAppNavigationState;
    systemState: ISystemState;
    articleListState: IArticleListState;
}

export interface IAppNavigationState {
    rootNavigationState: NavigationState;
    mainNavigationState: NavigationState;
    secondNavigationState: NavigationState;
    tabsState: NavigationState;
}

const NavigationInitialState: IAppNavigationState = {
    rootNavigationState: RootNavigationInitialState,
    mainNavigationState: MainNavigationInitialState,
    secondNavigationState: SecondNavigationInitialState,
    tabsState: TabNavigationInitialState,
};

export const AppInitialState: IAppState = {
    navigationState: NavigationInitialState,
    systemState: SystemInitialState,
    articleListState: ArticleListInitialState
};