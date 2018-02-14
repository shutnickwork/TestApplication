import * as React from "react";
import {NavigationStackScreenOptions} from "react-navigation";
import {CommonHeaderStyle} from "../../../core/theme/commonStyles";
import {View} from "react-native";
import {HeaderTitle} from "../../../common/components/HeaderTitle";

export class ArticleListProps {

    static getNavigationProps(headerTitle: string): NavigationStackScreenOptions {
        return {
            headerTitle: <HeaderTitle mainText={headerTitle}/>,
            headerStyle: CommonHeaderStyle.StackHeader.headerStyle as any,
            headerLeft: <View/>,
            headerRight: <View/>,
        };
    }
}
