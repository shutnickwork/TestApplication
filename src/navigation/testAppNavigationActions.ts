import {NavigationAction, NavigationActions, NavigationBackAction} from "react-navigation";
import {Navigation} from "./Navigation";
import {IArticle} from "../types/interfaces";

export class TestAppNavigationActions {

    navigateToBack(): NavigationBackAction {
        return NavigationActions.back();
    }

    navigateToArticleDetailsPage(article?: IArticle): NavigationAction {
        return NavigationActions.navigate({routeName: Navigation.Pages.articleDetails, params: {article: article}});
    }
}
