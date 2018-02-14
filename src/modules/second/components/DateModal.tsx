import React, {PureComponent} from "react";
import {DatePickerIOS, InteractionManager, Modal, TouchableWithoutFeedback, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../../common/styleSheetCreate";
import {Colors, windowWidth} from "../../../core/theme/commonStyles";
import {TextButton} from "../../../common/components/TextButton";

interface IProps {
    closeModal: () => void;
    confirmDate: (date: Date) => void;
    isVisible: boolean;
    initialDate: Date;
}

interface IState {
    resultDate: Date;
}

export class DateModal extends PureComponent<IProps, IState> {

    private onDateChange = (date: Date): void => this.setState({resultDate: date});
    private confirmDate = (): void => {
        this.props.closeModal();
        InteractionManager.runAfterInteractions(() => this.props.confirmDate(this.state.resultDate));
    };
    private requestClose = (): void => {
        this.props.closeModal();
    };

    constructor(props: IProps) {
        super(props);
        this.state = {resultDate: this.props.initialDate};
    }

    render(): JSX.Element {
        const {closeModal, isVisible} = this.props;

        return (
            <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={this.requestClose}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={modalStyles.modalBackground}>
                        <View style={modalStyles.modalContainer}>
                            <DatePickerIOS
                                date={this.state.resultDate}
                                minimumDate={new Date()}
                                maximumDate={new Date()}
                                mode="date"
                                onDateChange={this.onDateChange}
                            />
                            <View style={modalStyles.buttonContainer}>
                                <TextButton text="OK" onPress={this.confirmDate} isDark={false}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const modalStyles = styleSheetCreate({
    modalBackground: {
        flex: 1,
        backgroundColor: Colors.modalBackground,
        alignContent: "center",
        justifyContent: "center",
    } as ViewStyle,
    modalContainer: {
        width: windowWidth - 20,
        backgroundColor: Colors.white,
        borderRadius: 8,
        paddingBottom: 10,
        alignSelf: "center",
    } as ViewStyle,
    buttonContainer: {
        paddingHorizontal: 16
    } as ViewStyle
});