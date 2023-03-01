import React from "react";
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    View,
    Text,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

import getColorScheme from "./ColorsMode";

export default function Input({
    placeholder,
    keyboardAppearance,
    keyboardType,
    ...props
}: TextInputProps) {
    const color = getColorScheme();
    const inputRef = React.useRef<TextInput>(null);

    const inputStyle = () => {
        if (props.editable === false) {
            return {
                borderColor: color.inactiveBorder,
                backgroundColor: color.inactive,
                color: color.text,
            };
        }
        return {
            borderColor: color.accent,
            shadowColor : color.shadow,
            backgroundColor: color.background2,
            color: color.text,
        };
    };

    const icon = () => {
        if (placeholder === "Email") {
            return (
                <Feather
                    name="mail"
                    size={12}
                    color={color.accent}
                    style={{ margin: 2 }}
                />
            );
        } else if (placeholder === "Username") {
            return (
                <Feather
                    name="user"
                    size={12}
                    color={color.accent}
                    style={{ margin: 2 }}
                />
            );
        } else if (placeholder?.includes("Password")) {
            return (
                <Feather
                    name="lock"
                    size={12}
                    color={color.accent}
                    style={{ margin: 2 }}
                />
            );
        } else if (placeholder === "Confirm Password") {
            return (
                <Feather
                    name="lock"
                    size={12}
                    color={color.accent}
                    style={{ margin: 2 }}
                />
            );
        }
    };

    return (
        <View
            style={[props.style, styles.input, inputStyle()]}
            onTouchStart={() => inputRef.current?.focus()}
        >
            {icon()}
            <TextInput
                {...props}
                ref={inputRef}
                placeholder={placeholder}
                placeholderTextColor={color.text}
                keyboardAppearance={keyboardAppearance}
                keyboardType={keyboardType}
                style={[inputStyle(), { height: "100%", maxWidth: "95%" }]}
                secureTextEntry={
                    placeholder?.includes("Password") ? true : false
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
        flexDirection: "row",
        maxWidth: "80%",
        alignItems: "center",
    },
});
