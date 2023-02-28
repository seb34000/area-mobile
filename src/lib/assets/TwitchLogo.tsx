import React from "react";
import { FontAwesome } from '@expo/vector-icons';

export default function TwitchLogo(color: string, size: number, ...props: any) {
    return <FontAwesome name="twitch" size={size} color={color} {...props} />
}