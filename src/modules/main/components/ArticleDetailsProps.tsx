import * as React from "react";
import {NavigationStackScreenOptions} from "react-navigation";
import {CommonHeaderStyle} from "../../../core/theme/commonStyles";
import {View} from "react-native";
import {HeaderTitle} from "../../../common/components/HeaderTitle";
import {HeaderButton} from "../../../common/components/HeaderButton";
import {ImageResources} from "../../../common/ImageResources.g";
import {Navigation} from "../../../navigation/Navigation";

export class ArticleDetailsProps {

    static getNavigationProps(headerTitle: string): NavigationStackScreenOptions {
        return {
            headerTitle: <HeaderTitle mainText={headerTitle}/>,
            headerStyle: CommonHeaderStyle.StackHeader.headerStyle as any,
            headerLeft: <HeaderButton image={ImageResources.icon_back} action={Navigation.Actions.navigateToBack}/>,
            headerRight: <View/>,
        };
    }
}
