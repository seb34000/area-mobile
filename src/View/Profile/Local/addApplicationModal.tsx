import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList,
    Alert,
} from "react-native";
import Modal from "react-native-modal";
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";

import getColorScheme from "../../../component/ColorsMode";
import PressableIcon from "../../../component/PressableIcon";
import api from "../../../lib/api/api";
import GithubLogo from "../../../lib/assets/GithubLogo";
import PhillipeHueLogo from "../../../lib/assets/PhillipHueLogo";
import RedditLogo from "../../../lib/assets/RedditLogo";
import { profile } from "../../../store/action/userAction";

const INJECTED_JAVASCRIPT = `setTimeout(() => {
    window.ReactNativeWebView.postMessage(document.cookie);
}, 1000);`;

export default function AddApplicationModal({
    modalVisible,
    closeModal,
    user,
    setApplications,
}: any) {
    const color = getColorScheme();

    const [webviewUrl, setWebviewUrl] = React.useState<string | null>(null);
    const webviewRef = React.useRef<WebView>(null);

    const hasGithub = user.aplications.find(
        (app: any) => app.name === "Github"
    );
    const hasHue = user.aplications.find((app: any) => app.name === "Hue");
    const hasReddit = user.aplications.find(
        (app: any) => app.name === "Reddit"
    );

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const openWebview = (url: string) => {
        setWebviewUrl(api.api.getUri() + url);
    };

    const updateAppConnected = async (token: string) => {
        const res = await api.profile(token);
        // console.log(user.token);
        console.log(user.aplications);
        console.log(res.data.applications);
        setApplications(res.data.applications);
        closeModal();
        dispatch(
            profile(user.email, user.username, user.id, res.data.applications)
        );
        //@ts-ignore
        navigation.navigate("Profile");
    };

    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={closeModal}
            onBackButtonPress={closeModal}
            style={styles.container}
        >
            <View style={[styles.card, { backgroundColor: color.background }]}>
                {!webviewUrl ? (
                    <>
                        <Text style={[styles.title, { color: color.text }]}>
                            Add application
                        </Text>
                        <View style={styles.rowApp}>
                            {!hasGithub && (
                                <PressableIcon
                                    icon={GithubLogo(color.accent, 24)}
                                    onPress={() => openWebview("/auth/github")}
                                />
                            )}
                            {!hasHue && (
                                <PressableIcon
                                    icon={PhillipeHueLogo(color.accent, 24)}
                                    onPress={() => openWebview("/auth/hue")}
                                />
                            )}
                            {!hasReddit && (
                                <PressableIcon
                                    icon={RedditLogo(color.accent, 24)}
                                    onPress={() => openWebview("/auth/reddit")}
                                />
                            )}
                        </View>
                    </>
                ) : (
                    <WebView
                        source={{ uri: webviewUrl }}
                        useWebView2={true}
                        ref={webviewRef}
                        limitsNavigationsToAppBoundDomains={true}
                        onContentProcessDidTerminate={() =>
                            webviewRef.current?.reload()
                        }
                        style={styles.webview}
                        onNavigationStateChange={(event) => {
                            try {
                                webviewRef.current?.injectJavaScript(
                                    INJECTED_JAVASCRIPT
                                );
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                        onMessage={(event) => {
                            const cookie = event.nativeEvent.data;
                            if (cookie.includes("token")) {
                                // console.log(cookie.split('=')[1]);
                                setWebviewUrl(null);
                                updateAppConnected(cookie.split("=")[1]);
                            }
                        }}
                    />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },

    card: {
        alignSelf: "center",
        borderRadius: 10,
        alignItems: "center",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
    },

    rowApp: {
        flexDirection: "row",
    },

    webview: {
        flex: 1,
        height: Dimensions.get("window").height * 0.5,
        width: Dimensions.get("window").width * 0.9,
        borderRadius: 10,
    },
});
