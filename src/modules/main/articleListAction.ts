import {actionCreator} from "../../common/actionCreator";
import {LoadState} from "../../common/loadState";
import {IArticle} from "../../types/interfaces";

export class ArticleListActions {
    static setCurrentArticle = actionCreator<IArticle>("ArticleList/SET_ARTICLE");
    static loadArticles = actionCreator.async<IArticleListParams, IArticle[], Error>("ArticleList/LOAD_ARTICLES");
}

export interface IArticleListParams {
    loadState: LoadState;
}