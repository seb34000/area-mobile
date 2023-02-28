import * as React from "react"
import { MaterialIcons } from '@expo/vector-icons';

export default function PhillipeHueLogo(color: string, size: number, ...props: any) {
    return (
        <MaterialIcons name="lightbulb-outline" size={size} color={color} {...props} />
    )
}