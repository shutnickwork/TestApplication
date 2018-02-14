import React, {PureComponent} from "react";
import {ActivityIndicator, Animated, StyleSheet, ViewStyle} from "react-native";
import TimingAnimationConfig = Animated.TimingAnimationConfig;
import {styleSheetCreate} from "../styleSheetCreate";
import {Colors} from "../../core/theme/commonStyles";

export class LoadingView extends PureComponent<IProps, IState> {
    private style: ViewStyle;

    constructor(props: IProps) {
        super(props);

        this.state = {opacity: new Animated.Value(props.isLoading ? 1 : 0), isAnimationInProgress: false};
        this.style = StyleSheet.flatten([styles.indicatorContainer, {opacity: this.state.opacity as any}]);
    }

    componentWillReceiveProps(props: IProps): void {
        if (this.props.isLoading != props.isLoading) {
            const config: TimingAnimationConfig = {
                duration: 300,
                toValue: props.isLoading ? 1 : 0,
                useNativeDriver: true
            };
            this.setState({isAnimationInProgress: true});
            Animated.timing(this.state.opacity, config).start(result => this.setState({isAnimationInProgress: false}));
        }
    }

    render(): JSX.Element | null {
        if (this.props.isLoading || this.state.isAnimationInProgress) {
            return (
                <Animated.View style={this.style}>
                    <ActivityIndicator animating={this.props.isLoading} size="large" color={Colors.blue}/>
                </Animated.View>
            );
        } else {
            return null;
        }

    }
}

const styles = styleSheetCreate({
    indicatorContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5FCFF88",
        zIndex: 99
    } as ViewStyle,
});

interface IProps {
    isLoading: boolean;
}

interface IState {
    opacity: Animated.Value;
    isAnimationInProgress: boolean;
}
