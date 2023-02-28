import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

export default function GithubLogo(color: string, size: number, ...props: any) {
    // return <AntDesign name="github" size={size} color={color} {...props} />
    return <Feather name="github" size={size} color={color} {...props} />
}