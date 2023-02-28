import React, { useState } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

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
            alert("Please fill all the fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and confirm password are not the same");
            return;
        }
        const res = await api.register(
            "user5",
            "tester5@gmail.com",
            "Password123_"
        );
        console.log(JSON.stringify(res, null, 4));
        if (res.data.access_token) {
            dispatch(login(username, res.access_token));
        } else {
            alert(
                "Network error: [" +
                    res.status +
                    "] " +
                    res.data.error +
                    " " +
                    res.data.message
            );
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
