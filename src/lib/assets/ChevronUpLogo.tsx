import React from "react";
import Entypo from "react-native-vector-icons/Entypo";

export default function ChevronUpLogo(
    color: string,
    size: number,
    props?: any
) {
    return <Entypo name="chevron-up" size={size} color={color} {...props} />;
}
