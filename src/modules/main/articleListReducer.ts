import {reducerWithInitialState} from "typescript-fsa-reducers";
import {IArticleListState, ArticleListInitialState } from "./articleListState";
import {IAppState} from "../../core/appState";
import {LoadState} from "../../common/loadState";
import {newState} from "../../common/newState";
import {CoreActions} from "../../core/coreActions";
import {Failure, Success} from "typescript-fsa";
import * as _ from "lodash";
import {DEFAULT_PAGE_SIZE} from "../../common/calculatePage";
import {ArticleListActions, IArticleListParams} from "./articleListAction";
import {IArticle} from "../../types/interfaces";

function rehydrate(state: IArticleListState, payload: IAppState): IArticleListState {
    return newState(payload.articleListState || state, {error: null, loadState: LoadState.firstLoad});
}

function loadArticlesStarted(state: IArticleListState , params: IArticleListParams): IArticleListState {
    return newState(state, {loadState: params.loadState, error: null});
}

function loadArticlesDone(state: IArticleListState, success: Success<IArticleListParams, IArticle[]>): IArticleListState {
    let articles: IArticle[];
    let loadState: LoadState = LoadState.idle;
    if (success.params.loadState == LoadState.refresing) {
        articles = _.uniqBy(success.result.concat(state.articleList), a => a._id);
    } else if (state.loadState == LoadState.loadingMore) {
        articles = _.uniqBy(state.articleList.concat(success.result), a => a._id);
        loadState = success.result.length < DEFAULT_PAGE_SIZE ? LoadState.loadingMoreReturnsZero : loadState;
    } else {
        articles = success.result;
        if (articles.length < DEFAULT_PAGE_SIZE) {
            loadState = LoadState.loadingMoreReturnsZero;
        }
    }

    return newState(state, {error: null, articleList: articles, loadState: loadState});
}

function loadArticlesFailed(state: IArticleListState, failed: Failure<IEmpty, Error>): IArticleListState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

function setArticleHandler(state: IArticleListState, article: IArticle): IArticleListState {
    return newState(state, {currentArticle: article});
}

export const articleListReducer = reducerWithInitialState(ArticleListInitialState)
    .case(CoreActions.rehydrate, rehydrate)
    .case(ArticleListActions.loadArticles.started, loadArticlesStarted)
    .case(ArticleListActions.loadArticles.done, loadArticlesDone)
    .case(ArticleListActions.loadArticles.failed, loadArticlesFailed)
    .case(ArticleListActions.setCurrentArticle, setArticleHandler)
;