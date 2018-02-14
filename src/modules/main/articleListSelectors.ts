import {createSelector} from "reselect";
import {Dispatch} from "react-redux";
import {IArticlesDispatchProps, IArticlesStateProps} from "./ArticleList";
import {IAppState} from "../../core/appState";
import {IReduxProps} from "../../core/BaseComponent";
import {Navigation} from "../../navigation/Navigation";
import {LoadState} from "../../common/loadState";
import {ArticleListActions} from "./articleListAction";
import {ArticleListActionsAsync} from "./articleListActionsAsync";
import {IArticle} from "../../types/interfaces";

export const ArticlesSelectors = {
    mapStateToProps: createSelector<IAppState, LoadState, IArticle[], IArticle | null, string | null, IReduxProps<IArticlesStateProps, IEmpty>>(
        state => state.articleListState.loadState,
        state => state.articleListState.articleList,
        state => state.articleListState.currentArticle,
        state => state.articleListState.error,
        (loadState, articleList, currentArticle, error) => {

            return {
                stateProps: {
                    loadState,
                    articleList,
                    currentArticle,
                    error
                }
            };
        }
    ),

    mapDispatchToProps(dispatch: Dispatch<IAppState>): IReduxProps<IEmpty, IArticlesDispatchProps> {
        return {
            dispatchProps: {
                navigateToListItemPage: (listItem?: IArticle): void => {
                    dispatch(Navigation.Actions.navigateToArticleDetailsPage(listItem));
                },
                loadArticles: (loadState: LoadState): void => {
                    dispatch(ArticleListActionsAsync.loadArticles(loadState));
                },
                setArticle: (article: IArticle): void => {
                    dispatch(ArticleListActions.setCurrentArticle(article));
                }
            }
        };
    }
};