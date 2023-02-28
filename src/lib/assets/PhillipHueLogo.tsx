import * as React from "react"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function PhillipeHueLogo(color: string, size: number, ...props: any) {
    return (
        <MaterialIcons name="lightbulb-outline" size={size} color={color} {...props} />
    )
}