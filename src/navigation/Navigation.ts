import {NavigationLeafRoute, NavigationNavigatorProps} from "react-navigation";
import {TestAppNavigationActions} from "./testAppNavigationActions";
import {testAppTabs} from "./testAppTabs";
import {testAppPages} from "./testAppPages";

export type NavigationStackProps<T> = NavigationNavigatorProps<NavigationLeafRoute<T>>;

export class Navigation {
    static Tabs = testAppTabs;
    static Pages = testAppPages;
    static Actions = new TestAppNavigationActions();
}