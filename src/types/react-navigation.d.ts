// //react-navigation "extends" react
// /* tslint:disable */
// declare module 'react-navigation' {
//     import {ImageStyle, NavigationSceneRendererProps, SubViewRenderer, TextStyle, ViewStyle} from "react-native";
//     import React, {Component, ComponentClass, ReactElement} from "react";
//
//     export interface NavigationRoute {
//         /**
//          * React's key used by some navigators. No need to specify these manually,
//          * they will be defined by the router.
//          */
//         key: string,
//         /**
//          * For example 'Home'.
//          * This is used as a key in a route config when creating a navigator.
//          */
//         routeName: string,
//         /**
//          * Path is an advanced feature used for deep linking and on the web.
//          */
//         path?: string,
//         /**
//          * Params passed to this route when navigating to it,
//          * e.g. `{ car_id: 123 }` in a route that displays a car.
//          */
//         params?: NavigationParams,
//     }
//
//     export type NavigationDispatch<A> = (action: A) => boolean;
//
//     export interface NavigationProp<S, A> {
//         state: S,
//         dispatch: NavigationDispatch<A>,
//     }
//
//     export interface NavigationParams {
//         [key: string]: string;
//     }
//
//     export interface NavigationNavigateAction {
//         type: 'Navigation/NAVIGATE',
//         routeName: string,
//         params?: NavigationParams,
//
//         // The action to run inside the sub-router
//         action?: NavigationNavigateAction,
//     }
//
//     export interface NavigationInitAction {
//         type: 'Navigation/INIT',
//         params?: NavigationParams,
//     }
//
//     export interface NavigationResetAction {
//         type: 'Navigation/RESET',
//         index: number,
//         actions: NavigationNavigateAction[],
//     }
//
//     export interface NavigationUriAction {
//         type: 'Navigation/URI',
//         uri: string,
//     }
//
//     export interface NavigationBackAction {
//         type: 'Navigation/BACK',
//         key?: string,
//     }
//
//     export interface NavigationSetParamsAction {
//         type: 'Navigation/SET_PARAMS',
//
//         // The key of the route where the params should be set
//         key: string,
//
//         // The new params to merge into the existing route params
//         params?: NavigationParams,
//     }
//
//     export type NavigationStackAction = NavigationInitAction
//         | NavigationNavigateAction
//         | NavigationBackAction
//         | NavigationSetParamsAction
//         | NavigationResetAction;
//
//     export type NavigationTabAction = NavigationInitAction | NavigationNavigateAction | NavigationBackAction;
//
//     export type NavigationAction = NavigationInitAction | NavigationStackAction | NavigationTabAction;
//
//     export interface NavigationScreenProp<S, A> extends NavigationProp<S, A> {
//         goBack: (routeKey?: string) => boolean,
//         navigate: (routeName: string, params?: NavigationParams, action?: NavigationAction) => boolean,
//         setParams: (newParams: NavigationParams) => boolean,
//     }
//
//     export type NavigationScreenOptionFunc<T> = (navigation: NavigationScreenProp<NavigationRoute, NavigationAction>, config: T) => T;
//     export type NavigationScreenOption<T> = T | NavigationScreenOptionFunc<T>;
//
//     export type _Style = ViewStyle | TextStyle | ImageStyle;
//     export type Style = _Style | _Style[];
//
//     export interface HeaderConfig {
//         /**
//          * Title string used by the navigation bar, or a custom component
//          */
//         headerTitle?: string | ReactElement<any>;
//
//         /**
//          * Whether the navigation bar is visible.
//          */
//         headerVisible?: boolean;
//
//         /**
//          * Renders a custom right component
//          */
//         headerRight?: ReactElement<any>,
//
//         /**
//          * Renders a custom left component
//          */
//         headerLeft?: ReactElement<any>,
//
//         /**
//          * Style passed into navigation bar container
//          */
//         headerStyle?: Style,
//
//         /**
//          * Style passed into navigation bar title
//          */
//         headerTitleStyle?: Style,
//
//         headerBackTitle?: string,
//
//         gesturesEnabled?: boolean,
//
//         header?: ReactElement<any> | null;
//
//         // // Style of title text
//         // titleTextStyle?: $NavigationThunk<Object>,
//         // // Tint color of navigation bar contents
//         // tintColor?: $NavigationThunk<string>,
//         // // Navigation bar height
//         // height?: $NavigationThunk<number>,
//         // // Navigation bar translucentcy
//         // translucent?: $NavigationThunk<boolean>,
//         // // Renders a custom left component
//         // renderLeft?: React.Element<*> |
//         //   (navigation: NavigationProp<*>, canGoBack: boolean) => React.Element<*>,
//         // // Renders a custom navigation bar background
//         // renderBackground?: $NavigationThunk<React.Element<*>>,
//     }
//
//     export interface TabBarConfig {
//         /**
//          * Icon used by the tab bar.
//          */
//         tabBarIcon?: (options: { tintColor: string, focused: boolean }) => ReactElement<any>;
//         /**
//          * Label text used by the tab bar.
//          */
//         tabBarLabel?: string | ReactElement<any>;
//     }
//
//     export interface  DrawerConfig {
//         /**
//          * Icon used by the drawer.
//          */
//         drawerIcon?: (options: { tintColor: string, focused: boolean }) => ReactElement<any>;
//         /**
//          * Label text used by the drawer.
//          */
//         drawerLabel?: string;
//     }
//     export interface CardStackConfig {
//         /**
//          * Whether you can use gestures to dismiss this screen.
//          * Defaults to true on iOS, false on Android.
//          */
//         gesturesEnabled?: boolean;
//     }
//
//     export type NavigationOptions<State> =
//         NavigationScreenOptions
//         | ((config: NavigationOptionsGetterConfig<State>) => NavigationScreenOptions);
//
//     export interface NavigationOptionsGetterConfig<State> {
//         navigationOptions: NavigationScreenOptions,
//         navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
//         stateProps: State
//     }
//
//     export interface NavigationScreenOptions extends HeaderConfig, TabBarConfig, DrawerConfig {
//         /**
//          * Title is rendered by certain navigators, e.g. the tab navigator,
//          * or on web as the title of the browser tab.
//          */
//         title?: NavigationScreenOption<string>;
//     }
//
//     export interface NavigationRouteConfig {
//         [key: string]: any,
//         navigationOptions?: NavigationScreenOptions,
//         path?: string,
//     }
//
//     export interface NavigationTabRouterConfig {
//         initialRouteName?: string,
//         paths?: NavigationPathsConfig,
//         navigationOptions?: NavigationScreenOptions,
//         order?: string[],
//
//         // Does the back button cause the router to switch to the initial tab
//         backBehavior?: 'none' | 'initialRoute', // defaults `initialRoute`
//     }
//
//     export interface NavigationPathsConfig {
//         [routeName: string]: string,
//     }
//
//     export interface TabBarOptionsIOS {
//         /**
//          * label and icon color of the active tab
//          */
//         activeTintColor?: string;
//         /**
//          * background color of the active tab
//          */
//         activeBackgroundColor?: string;
//         /**
//          * label and icon color of the inactive tab
//          */
//         inactiveTintColor?: string;
//         /**
//          * background color of the inactive tab
//          */
//         inactiveBackgroundColor?: string;
//         /**
//          * whether to show label for tab, default is true
//          */
//         showLabel?: boolean;
//         /**
//          * style object for the tab bar
//          */
//         style?: Style;
//         /**
//          * style object for the tab label
//          */
//         labelStyle?: Style;
//     }
//
//     export interface TabBarOptionsAndroid {
//         /**
//          * label and icon color of the active tab
//          */
//         activeTintColor?: string;
//         /**
//          * label and icon color of the inactive tab
//          */
//         inactiveTintColor?: string;
//         /**
//          * whether to show icon for tab, default is false
//          */
//         showIcon?: boolean;
//         /**
//          * whether to show label for tab, default is true
//          */
//         showLabel?: boolean;
//         /**
//          * whether to make label uppercase, default is true
//          */
//         upperCaseLabel?: boolean;
//         /**
//          * color for material ripple (Android >= 5.0 only)
//          */
//         pressColor?: string;
//         /**
//          * opacity for pressed tab (iOS and Android < 5.0 only)
//          */
//         pressOpacity?: number;
//         /**
//          * whether to enable scrollable tabs
//          */
//         scrollEnabled?: boolean;
//         /**
//          * style object for the tab
//          */
//         tabStyle?: Style;
//         /**
//          * style object for the tab indicator (line at the bottom of the tab)
//          */
//         indicatorStyle?: Style;
//         /**
//          * style object for the tab label
//          */
//         labelStyle?: Style;
//         /**
//          * style object for the tab bar
//          */
//         style?: Style;
//     }
//
//     export function addNavigationHelpers<S>(navigation: NavigationProp<S, NavigationAction>): S;
//
//     export interface TabBarOptions extends TabBarOptionsIOS, TabBarOptionsAndroid {
//
//     }
//
//     export type TabBarPosition = 'top' | 'bottom';
//
//     export interface NavigationState {
//         /**
//          * Index refers to the active child route in the routes array.
//          */
//         index: number,
//         routes: (NavigationRoute | (NavigationRoute & NavigationState))[],
//     }
//
//     export type NavigationComponent = NavigationScreenComponent<any> | NavigationNavigator<any>;
//
//     export type NavigationScreenComponent<T> = ComponentClass<T> & {
//         navigationOptions?: NavigationScreenOptions,
//     };
//
//     export interface NavigationNavigator<T> extends ComponentClass<T> {
//         router?: NavigationRouter,
//         navigationOptions?: NavigationScreenOptions,
//     }
//
//
//     export interface NavigationRouter {
//         /**
//          * The reducer that outputs the new navigation state for a given action, with
//          * an optional previous state. When the action is considered handled but the
//          * state is unchanged, the output state is null.
//          */
//         getStateForAction: (action: NavigationAction, lastState?: NavigationState) => NavigationState,
//         /**
//          * Maps a URI-like string to an action. This can be mapped to a state
//          * using `getStateForAction`.
//          */
//         getActionForPathAndParams: (path: string, params?: NavigationParams) => NavigationAction,
//         getPathAndParamsForState: (state: NavigationState) => { path: string, params?: NavigationParams },
//
//         getComponentForRouteName: (routeName: string) => NavigationComponent,
//
//         getComponentForState: (state: NavigationState) => NavigationComponent,
//
//         /**
//          * Gets the screen config for a given navigation screen prop.
//          *
//          * For example, we could get the config for a 'Foo' screen when the
//          * `navigation.state` is:
//          *
//          *  {routeName: 'Foo', key: '123'}
//          */
//         getScreenConfig: (navigation: NavigationScreenProp<NavigationRoute, NavigationAction>, optionName: string) => any
//     }
//
//     export interface NavigationContainer<P, S> extends React.Component<P, S> {
//         new (props?: any, context?: any): Component<P, S>
//         router: NavigationRouter;
//     }
//
//     export interface TabViewConfig {
//         tabBarComponent?: React.Component<any, any>;
//         tabBarPosition?: TabBarPosition;
//         tabBarOptions?: TabBarOptions;
//         swipeEnabled?: boolean;
//         animationEnabled?: boolean;
//         lazy?: boolean;
//     }
//
//     export interface NavigationContainerConfig {
//         containerOptions?: NavigationContainerOptions,
//     }
//
//     export interface NavigationContainerOptions {
//         // This is used to extract the path from the URI passed to the app for a deep link
//         URIPrefix?: string,
//     }
//
//     export interface TabNavigatorConfig extends NavigationTabRouterConfig, TabViewConfig, NavigationContainerConfig {
//     }
//
//     export interface NavigationRouteConfigMap {
//         [routeName: string]: NavigationRouteConfig,
//     }
//
//     export function TabNavigator(routeConfigs: NavigationRouteConfigMap, tabNavigatorConfig: TabNavigatorConfig): NavigationContainer<{ navigation: any }, {}>;
//
//     export function StackNavigator(routeConfigs: NavigationRouteConfigMap, stackNavigatorConfig: StackNavigatorConfig): NavigationContainer<any, any>;
//
//     export interface StackNavigatorConfig extends NavigationContainerConfig, NavigationStackViewConfig, NavigationStackRouterConfig {
//     }
//
//     export interface NavigationStackRouterConfig {
//         initialRouteName?: string,
//         initialRouteParams?: NavigationParams,
//         paths?: NavigationPathsConfig,
//         navigationOptions?: NavigationScreenOptions,
//     }
//
//     export type HeaderMode = 'float' | 'screen' | 'none';
//
//     export interface NavigationStackViewConfig {
//         mode?: 'card' | 'modal',
//         headerMode?: HeaderMode,
//         headerComponent?: ComponentClass<HeaderProps>,
//         cardStyle?: Style,
//         onTransitionStart?: () => void,
//         onTransitionEnd?: () => void
//     }
//
//     export interface HeaderProps extends NavigationSceneRendererProps {
//         mode: HeaderMode,
//         onNavigateBack?: () => void,
//         renderLeftComponent: SubViewRenderer,
//         renderRightComponent: SubViewRenderer,
//         renderTitleComponent: SubViewRenderer,
//         tintColor?: string,
//         router: NavigationRouter,
//     }
//
//     interface NavigationActionsStatic {
//         BACK: string;
//         INIT: string;
//         NAVIGATE: string;
//         RESET: string;
//         SET_PARAMS: string;
//         URI: string;
//
//         // Action creators
//         back: (payload?: object) => NavigationBackAction;
//         init: (payload: object) => NavigationInitAction;
//         navigate: (payload: object) => NavigationNavigateAction;
//         reset: (payload: object) => NavigationResetAction;
//         setParams: (payload: object) => { type: string, payload: object };
//         uri: (payload: object) => { type: string, payload: object };
//     }
//
//     export const NavigationActions: NavigationActionsStatic;
// }
