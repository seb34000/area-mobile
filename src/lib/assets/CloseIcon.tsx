import React from "react";
import { AntDesign } from '@expo/vector-icons'; 

export default function CloseIcon(color: string, size: number, ...props: any) {
    return <AntDesign name="close" size={size} color={color} {...props} />
}