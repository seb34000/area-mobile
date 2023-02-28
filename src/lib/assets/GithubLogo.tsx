import React from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

export default function GithubLogo(color: string, size: number, ...props: any) {
    // return <AntDesign name="github" size={size} color={color} {...props} />
    return <Feather name="github" size={size} color={color} {...props} />
}