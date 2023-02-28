import React, { useEffect } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, Text } from "react-native";
import { useDispatch } from "react-redux";

import getColorScheme from "../component/ColorsMode";

import Button from "../component/Button";
import { logout } from "../store/action/userAction";
import api from "../lib/api/api";

export default function LogoutScreen(props: any) {
    const color = getColorScheme();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("logout");
        console.log(props.navigation);
    }, []);

    const onClick = () => {
        dispatch(logout());
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { backgroundColor: color.background }]}
        >
            <Text>Are you sure you want to logout?</Text>
            <Button
                title="Logout"
                onPress={() => {
                    onClick();
                }}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
