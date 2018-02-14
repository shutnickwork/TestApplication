import React, {PureComponent} from "react";
import {Dimensions, Image, ImageURISource, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../styleSheetCreate";
import {Colors} from "../../core/theme/commonStyles";

const deviceWidth = Dimensions.get("window").width;

export class ImagesSwiper extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {current: 0};
    }

    private onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent> | undefined): void => {
        console.log(`onMomentumScrollEnd`);
        if (!e) {
            return;
        }
        const x = e.nativeEvent.contentOffset.x;
        const x3 = x > 0 ? x : 0;
        const current = Math.round(x3 / e.nativeEvent.layoutMeasurement.width);
        this.setCurrentSlide(current);
    };

    private setCurrentSlide = (index: number): void => {
        this.setState({current: index});
    };

    private renderItem = (image: ImageURISource, index: number): JSX.Element => {
        return (
            <Image
                style={{height: 186, resizeMode: "cover", width: deviceWidth}}
                source={image}
                key={index}
            />);
    };

    render(): JSX.Element {
        const current = this.state.current;

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.slidesScroll}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                >
                    {this.props.images.map(this.renderItem)}
                </ScrollView>
                <View style={styles.dots}>
                    {this.props.images.map((c, n) => <View style={[styles.dot, {opacity: n == current ? 1 : 0.4}]} key={n}/>)}
                </View>
            </View>
        );
    }

}

interface IState {
    current: number;
}

interface IProps {
    images: ImageURISource[];
    onItemPress?: () => void;
}

const styles = styleSheetCreate({
    container: {
        flexDirection: "column",
        width: deviceWidth,
        height: 186,
    } as ViewStyle,
    slidesScroll: {
        zIndex: 5
    } as ViewStyle,
    dots: {
        zIndex: 10,
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        marginBottom: 19.4
    } as ViewStyle,
    dot: {
        backgroundColor: Colors.darkBlue,
        marginHorizontal: 4.6,
        opacity: 1,
        height: 8,
        width: 8,
        borderRadius: 4,
    } as ViewStyle
});
