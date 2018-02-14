import React, {PureComponent} from "react";
import {Image, ImageStyle, ImageURISource} from "react-native";
import {styleSheetCreate} from "../styleSheetCreate";

export class TabBarIcon extends PureComponent<IProps, IEmpty> {
    render(): JSX.Element {
        return (
            <Image resizeMode="stretch" style={styles.image} source={this.props.isFocused ? this.props.imageActiveSource : this.props.imageSource}/>
        );
    }
}

interface IProps {
    imageSource: ImageURISource;
    imageActiveSource: ImageURISource;
    isFocused: boolean;
}

const styles = styleSheetCreate({
    image: {
        height: 24,
        resizeMode: "contain",
    } as ImageStyle,
});
