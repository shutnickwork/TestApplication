import {LoadState} from "../../common/loadState";
import {IArticle} from "../../types/interfaces";

export interface IArticleListState {
    error: string | null;
    articleList: IArticle[];
    currentArticle: IArticle | null;
    loadState: LoadState;
}

export const ArticleListInitialState: IArticleListState = {
    error: null,
    articleList: [],
    currentArticle: null,
    loadState: LoadState.firstLoad,
};