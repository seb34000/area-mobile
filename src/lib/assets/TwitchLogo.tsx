import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function TwitchLogo(color: string, size: number, ...props: any) {
    return <FontAwesome name="twitch" size={size} color={color} {...props} />
}