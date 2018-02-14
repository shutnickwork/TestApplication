export enum LoadState {
    needLoad = "needLoad",
    firstLoad = "firstLoad",
    pullToRefresh = "pullToRefresh",
    idle = "idle",
    refresing = "refreshing",
    loadingMore = "loadingMore",
    loadingMoreReturnsZero = "loadingMoreReturnsZero",
    error = "error"
}