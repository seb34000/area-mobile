import React from "react";
// import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

export default function RedditLogo(color: string, size: number) {
    return (
        // <FontAwesome name="reddit-alien" size={size} color={color} />
        <Ionicons name="ios-logo-reddit" size={size} color={color} />
    );
}