import React from "react";
import Entypo from "react-native-vector-icons/Entypo";

export default function ChevronDownLogo(
    color: string,
    size: number,
    props?: any
) {
    return <Entypo name="chevron-down" size={size} color={color} {...props} />;
}
