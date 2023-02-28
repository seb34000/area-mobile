import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function ChevronUpLogo(
    color: string,
    size: number,
    props?: any
) {
    return <Entypo name="chevron-up" size={size} color={color} {...props} />;
}
