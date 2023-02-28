import React, { useEffect } from "react";
import {
    PressableStateCallbackType,
    TouchableOpacityProps,
} from "react-native";
import { StyleSheet, Pressable } from "react-native";

import getColorScheme from "./ColorsMode";

export interface PressableIconProps extends TouchableOpacityProps {
    onPress: () => void;
    icon: any;
}

export default function PressableIcon({
    onPress,
    icon,
    ...props
}: PressableIconProps) {
    const color = getColorScheme();

    useEffect(() => {}, []);

    const buttonStyle = (isPress: boolean) => {
        if (props.disabled === true) {
            return {
                borderColor: color.inactiveBorder,
            };
        }
        return {
            borderColor: color.accent,
        };
    };

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }: PressableStateCallbackType) => [
                buttonStyle(pressed.valueOf()),
                styles.button,
            ]}
            {...props}
        >
            {icon}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        margin: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: "row",
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
    },
});
