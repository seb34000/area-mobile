import { useColorScheme } from "react-native";

const colors = {
    light: {
        background: "#DDDDDD",
        background2: "#EEEEEE",
        text: "#333333",
        accent: "#E91E63",
        inactive: "#BDBDBD",
        inactiveBorder: "#E0E0E0",
        shadow: "#999999",
        is: 'light',
    },
    dark: {
        background: "#111111",
        background2: "#222222",
        text: "#F7F7F7",
        accent: "#7986cb",
        inactive: "#333333",
        inactiveBorder: "#424242",
        shadow: "#424242",
        is: 'dark',
    },
};

export default function getColorScheme() {
    const colorScheme = useColorScheme();
    if (colorScheme === "dark") {
        return colors.dark;
    } else if (colorScheme === "light") {
        return colors.light;
    }
    return colors.dark;
}