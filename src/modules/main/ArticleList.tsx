import React from "react";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {connect} from "react-redux";
import {ArticlesSelectors} from "./articleListSelectors";
import {LoadState} from "../../common/loadState";
import {FlatList, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/styleSheetCreate";
import {FontNames} from "../../core/theme/FontNames";
import {Colors} from "../../core/theme/commonStyles";
import {NavigationStackScreenOptions} from "react-navigation";
import {ArticleListProps} from "./components/ArticleListProps";
import {LoadingView} from "../../common/components/LoadingView";
import {IArticle} from "../../types/interfaces";
import {ArticleListItem} from "./components/ArticleListItem";

interface IArticlesProps extends IReduxProps<IArticlesStateProps, IArticlesDispatchProps> {
}

export interface IArticlesStateProps {
    error: string | null;
    articleList: IArticle[];
    currentArticle: IArticle | null;
    loadState: LoadState;
}

export interface IArticlesDispatchProps {
    setArticle: (article: IArticle) => void;
    navigateToListItemPage: (listItem: IArticle) => void;
    loadArticles: (loadState: LoadState) => void;
}

@connect(ArticlesSelectors.mapStateToProps, ArticlesSelectors.mapDispatchToProps)
export class ArticleList extends BaseReduxComponent<IArticlesProps, IArticlesStateProps, IArticlesDispatchProps, IEmpty> {
    static navigationOptions = (): NavigationStackScreenOptions => {
        return ArticleListProps.getNavigationProps("Статьи");
    };
    private onItemSelected = (item: IArticle): void => {
        this.dispatchProps.setArticle(item);
        this.dispatchProps.navigateToListItemPage(item);
    };
    private keyExtractor = (item: IArticle): string => {
        return item._id.toString();
    };
    private loadArticles = (): void => {
        this.dispatchProps.loadArticles(this.stateProps.loadState);
    };
    private pullToRefresh = (): void => {
        this.dispatchProps.loadArticles(LoadState.pullToRefresh);
    };
    private loadMore = (): void => {
        if (this.stateProps.articleList.length > 0) {
            this.dispatchProps.loadArticles(LoadState.loadingMore);
        }
    };
    private renderItem = ({item}: { item: IArticle, index: number }): JSX.Element => {
        return (
            <ArticleListItem
                label={item.label}
                title={item.title}
                status={item.status}
                imageSource={"http://fagma.com/uploads/posts/2014-08/1408256174_22.jpg"}
                authorName={item.authorName}
                created={item.created}
                item={item}
                onPress={this.onItemSelected}
            />
        );
    };
    private emptyComponentForError = (): JSX.Element => {
        return (
            <View style={styles.container}>
                <Text>{"Нет статей"}</Text>
            </View>
        );
    };

    private onPress = (): void => {
        const {currentArticle} = this.stateProps;
        if (currentArticle) {
            this.dispatchProps.navigateToListItemPage(currentArticle);
        }
    };

    private renderHeader = (): JSX.Element => {
        const {currentArticle} = this.stateProps;

        return (
            <TouchableOpacity
                style={styles.header}
                disabled={!currentArticle}
                onPress={this.onPress}
                activeOpacity={0.7}
            >
                <Text style={{textAlign: "center"}}>{currentArticle ? currentArticle.title : "Ничего не выбрано"}</Text>
            </TouchableOpacity>
        );
    };

    constructor(props: IArticlesProps) {
        super(props);

        this.state = {
            article: null
        };
    }

    componentDidMount(): void {
        this.loadArticles();
    }

    render(): JSX.Element {
        const {loadState, articleList} = this.stateProps;
        if (loadState == LoadState.firstLoad) {
            return <LoadingView isLoading={true}/>;
        } else {
            return (
                <View style={styles.container}>
                    {this.renderHeader()}
                    <FlatList
                        data={articleList}
                        ListEmptyComponent={this.emptyComponentForError()}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        onEndReached={this.loadMore}
                        refreshing={loadState == LoadState.pullToRefresh}
                        onRefresh={this.pullToRefresh}
                        onEndReachedThreshold={0.3}
                    />
                    <LoadingView isLoading={this.stateProps.loadState == LoadState.refresing}/>
                </View>
            );
        }
    }
}

const styles = styleSheetCreate({
    title: {
        fontSize: 16,
        fontFamily: FontNames.regular,
        color: Colors.fontDark,
        marginLeft: 16,
    } as TextStyle,
    header: {
        height: 40,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.separator,
    } as ViewStyle,
    icon: {
        height: 24,
        width: 24,
    } as ImageStyle,
    container: {
        flex: 1,
        backgroundColor: Colors.white
    } as ViewStyle,
});