import React from 'react';
// import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

export default function TwitterLogo(color: string, size: number, ...props: any) {
    return <Feather name="twitter" size={size} color={color} {...props} />
}