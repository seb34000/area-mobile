import React, { useState } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";

import { showMessage, hideMessage } from "react-native-flash-message";


import Feather from "react-native-vector-icons/Feather";

import getColorScheme from "../component/ColorsMode";

import Button from "../component/Button";
import Input from "../component/Input";

import api from "../lib/api/api";
import { useDispatch } from "react-redux";
import { login } from "../store/action/userAction";

export default function RegisterScreen(props: any) {
    const color = getColorScheme();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onClick = async () => {
        if (
            email === "" ||
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            showMessage({
                message: "Please fill all the fields",
                type: "danger",
            });
            return;
        }
        if (password !== confirmPassword) {
            showMessage({
                message: "Password and confirm password are not the same",
                type: "danger",
                });
            return;
        }
        const res = await api.register(
            "user5",
            "tester5@gmail.com",
            "Password123_"
        );
        console.log(JSON.stringify(res, null, 4));
        if (res.data.access_token) {
            dispatch(login(res.access_token));
        } else {
            showMessage({
                message: "Network error: [" +
                    res.status +
                    "] " +
                    res.data.error +
                    " " +
                    res.data.message,
                    type: "danger"
                });
        }
    };

    return (
        <ScrollView
            style={[{ flex: 1 }, { backgroundColor: color.background }]}
            contentContainerStyle={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[
                    styles.container,
                    { backgroundColor: color.background },
                ]}
            >
                <Feather name="user" size={24} color={color.accent} />
                <Input
                    placeholder="Email"
                    keyboardAppearance="default"
                    keyboardType="email-address"
                    style={{ width: "40%" }}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Username"
                    keyboardAppearance="default"
                    keyboardType="default"
                    style={{ width: "40%" }}
                    onChangeText={(text) => setUsername(text)}
                />
                <Input
                    placeholder="Password"
                    keyboardAppearance="default"
                    keyboardType="default"
                    style={{ width: "40%" }}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Confirm Password"
                    keyboardAppearance="default"
                    keyboardType="default"
                    style={{ width: "40%" }}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <Button title="Register" onPress={onClick} />
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
