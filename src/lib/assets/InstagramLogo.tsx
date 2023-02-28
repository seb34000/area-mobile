import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 

export default function GithubLogo(color: string, size: number, ...props: any) {

    return <AntDesign name="instagram" size={size} color={color} {...props} />
}