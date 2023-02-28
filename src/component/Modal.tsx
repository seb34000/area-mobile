import React from "react";
import { Modal, ModalProps, View, StyleSheet } from "react-native";

import getColorScheme from "./ColorsMode";
import PressableIcon from "./PressableIcon";

import CloseIcon from "../lib/assets/CloseIcon";

interface CModalProps extends ModalProps {
    onPressClose: () => void;
}

export default function CModal({onPressClose, ...props}: CModalProps) {
    const color = getColorScheme();

    const headerStyle = () => {
        return {
            backgroundColor: color.background,
        }
    }

    const bodyStyle = () => {
        return {
            backgroundColor: color.background,
        }
    }

    return (
        <Modal style={styles.container} visible={props.visible} animationType='slide' presentationStyle='pageSheet'>
            <View style={[styles.header, headerStyle()]}>
                <PressableIcon onPress={onPressClose} icon={CloseIcon(color.accent, 24)} />
            </View>
            <View style={[styles.body, bodyStyle()]}>
                {props.children}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flex: 0.1,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },

    body: {
        flex: 1,
    },

});