import {LoadState} from "../../common/loadState";
import {SimpleThunk} from "../../common/simpleThunk";
import {ArticleListActions} from "./articleListAction";
import {calculatePage, DEFAULT_PAGE_SIZE} from "../../common/calculatePage";
import {requestsRepository} from "../../core/api/requestsRepository";
import {IResponseArticles} from "../../core/api/getDataRequest";

export class ArticleListActionsAsync {
    static loadArticles(loadState: LoadState): SimpleThunk {
        return async (dispatch, getState): Promise<void> => {
            const params = {loadState: loadState};
            try {
                dispatch(ArticleListActions.loadArticles.started(params));

                const currentCount = getState().articleListState.articleList.length || 0;
                const page = loadState == LoadState.loadingMore ? calculatePage(currentCount, DEFAULT_PAGE_SIZE) : 1;
                const request = {
                    page: page,
                    pageSize: DEFAULT_PAGE_SIZE,
                };
                console.log("ArticleListActionsAsync loadArticles request", {request});
                const response: IResponseArticles = await requestsRepository.getDataRequest.getArticles(page, DEFAULT_PAGE_SIZE);
                console.log("ArticleListActionsAsync loadArticles result", {response});
                dispatch(ArticleListActions.loadArticles.done({params, result: response.articles}));
            } catch (error) {
                console.log("ArticleListActionsAsync loadArticles error", {error});
                dispatch(ArticleListActions.loadArticles.failed({params, error}));
            }
        };
    }
}