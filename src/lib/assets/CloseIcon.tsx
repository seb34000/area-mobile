import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function CloseIcon(color: string, size: number, ...props: any) {
    return <AntDesign name="close" size={size} color={color} {...props} />
}