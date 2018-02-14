import React, {PureComponent} from "react";
import {Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {ImageSource} from "../../../common/MetImageSource";
import {Colors} from "../../../core/theme/commonStyles";
import {styleSheetCreate} from "../../../common/styleSheetCreate";
import {FontNames} from "../../../core/theme/FontNames";
import {IArticle} from "../../../types/interfaces";

export class ArticleListItem extends PureComponent<IProps, IEmpty> {

    private onPress = (): void => {
        const onPressProp = this.props.onPress;
        if (onPressProp && this.props.item) {
            onPressProp(this.props.item);
        }
    };

    render(): JSX.Element {
        const {imageSource, title, label, authorName, onPress, created} = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                disabled={!onPress}
                onPress={this.onPress}
                activeOpacity={0.7}
            >
                <Image style={styles.image} source={ImageSource.create(imageSource)} resizeMethod={"resize"}/>
                <View style={styles.descriptionContainer}>
                    {label ? <Text style={styles.label}>Метка: {label}</Text> : null}
                    <Text style={styles.label}>Название: {title}</Text>
                    <Text style={styles.label}>Дата: {created}</Text>
                    <Text style={styles.label}>Автор: {authorName}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

interface IProps {
    imageSource: string;
    label?: string;
    title: string;
    authorName: string;
    status: string;
    created: string | Date;
    item?: IArticle;
    onPress?: (item: IArticle) => void;
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 140,
        borderBottomWidth: 1,
        borderBottomColor: Colors.separator,
        backgroundColor: Colors.white
    } as ViewStyle,
    image: {
        height: 106,
        width: 106,
        resizeMode: "cover",
        marginTop: 16,
        marginLeft: 16,
        marginBottom: 16
    } as ImageStyle,
    descriptionContainer: {
        flex: 1,
        marginTop: 13,
        marginLeft: 8,
        marginBottom: 12,
        paddingRight: 14,
        flexDirection: "column",
        justifyContent: "space-between"
    } as ViewStyle,
    authorName: {
        flex: 1,
        fontSize: 14,
        fontFamily: FontNames.regular,
        color: Colors.fontDark,
    } as TextStyle,
    label: {
        fontSize: 14,
        fontFamily: FontNames.regular,
        color: Colors.fontDark,
    } as TextStyle,
});