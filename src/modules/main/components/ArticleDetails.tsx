import * as React from "react";
import {NavigationAction, NavigationLeafRoute, NavigationScreenOptions, NavigationScreenProp} from "react-navigation";
import {IArticle} from "../../../types/interfaces";
import {ArticleDetailsProps} from "./ArticleDetailsProps";
import {BaseComponent} from "../../../core/BaseComponent";
import {View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/styleSheetCreate";

type ArticleDetailsNavigation = NavigationScreenProp<NavigationLeafRoute<{ article: IArticle }>, NavigationAction>;

interface IProps {
    navigation: ArticleDetailsNavigation;
}

export class ArticleDetails extends BaseComponent<IProps, IEmpty> {
    static navigationOptions: any = (params: { navigation: ArticleDetailsNavigation }): NavigationScreenOptions => {
        return ArticleDetailsProps.getNavigationProps(params.navigation.state.params && params.navigation.state.params.article.title);
    };

    render(): JSX.Element {

        return (
            <View>
                <View style={styles.container} />
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1
    } as ViewStyle,
});