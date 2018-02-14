import {default as React, PureComponent} from "react";
import {DatePickerAndroid, DatePickerAndroidOpenReturn, Dimensions, ImageBackground, Platform, View, ViewStyle} from "react-native";
import {ImageSource} from "../../common/MetImageSource";
import Swiper from "react-native-swiper";
import {styleSheetCreate} from "../../common/styleSheetCreate";
import {Colors} from "../../core/theme/commonStyles";
import {TextButton} from "../../common/components/TextButton";
import {DateModal} from "./components/DateModal";

export const imagesSwiper = [
    "http://bipbap.ru/wp-content/uploads/2017/04/4-2.jpg",
    "https://imgprx.livejournal.net/0746f16d28a1c6f25a1ac39f4b2c3f6c67b0ce96/mLWG5H2r70ajjBKJD8Rt7dtQJCFL7UtzIwnYUyvkoVqUbzoJ79i3u7Yn7GIisJ1asKJmb7WNb9X1rYpY0Byb0w",
    "http://bipbap.ru/wp-content/uploads/2017/04/1334248724_1.jpg",
];

interface IState {
    showSwiper: boolean;
    isModalVisible: boolean;
}

export class SecondScreen extends PureComponent<{}, IState> {
    private renderSwipeItem = (uri: string, index: number): JSX.Element => {
        return (
            <ImageBackground
                style={styles.imageContainer}
                source={ImageSource.create(uri)}
                key={index}
                resizeMethod={"resize"}
            />
        );
    };

    private renderSwiper = (): JSX.Element | null => {
        if (this.state.showSwiper) {
            return (
                <Swiper loadMinimal={true}>
                    {imagesSwiper.map(this.renderSwipeItem)}
                </Swiper>
            );
        } else {
            return null;
        }
    };

    constructor(props: IEmpty) {
        super(props);
        this.state = {
            showSwiper: false,
            isModalVisible: false
        };
    }
    static fromString(obj: string | Date): Date {
        if (obj instanceof Date) {
            return obj;
        }

        return new Date(obj);
    }

    private showPicker = async (): Promise<void> => {

        const data: DatePickerAndroidOpenReturn = await DatePickerAndroid.open({
            date: SecondScreen.fromString(new Date(2018, 2, 14)),
            minDate: new Date(2018, 2, 14),
            maxDate: new Date(2020, 4, 25)
        });

        if (data.action == DatePickerAndroid.dateSetAction) {
            this.setState({showSwiper: !this.state.showSwiper});
        }
    };

    private showPickerIOS = (): void => {
        this.setState({isModalVisible: true});
    };
    private showSwiperIOS = (birthDate: Date | string): void => {
        this.setState({showSwiper: !this.state.showSwiper});
    };

    private onModalClose = (): void => {
        this.setState({isModalVisible: false});
    };

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                {this.renderSwiper()}
                <DateModal
                    initialDate={SecondScreen.fromString(new Date(2018, 2, 14))}
                    isVisible={this.state.isModalVisible}
                    closeModal={this.onModalClose}
                    confirmDate={this.showSwiperIOS}
                />
                <View style={styles.buttonContainer}>
                    <TextButton text={"Выбор даты"} isDark={true} onPress={Platform.OS == "android" ? this.showPicker : this.showPickerIOS} />
                </View>
            </View>
        );
    }
}

const height = Dimensions.get("window").height * 0.5;

const styles = styleSheetCreate({
    container: {
        flex: 1,
        marginTop: Platform.OS == "ios" ? 20 : 0,
        justifyContent: "space-between",
        backgroundColor: Colors.white,
    } as ViewStyle,
    imageContainer: {
        height: height,
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    buttonContainer: {
        paddingBottom: 50
    } as ViewStyle
});