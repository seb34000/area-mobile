import React from "react";
import { StyleSheet, Text, View } from "react-native";
import getColorScheme from "./ColorsMode";
import { CardProps } from "../lib/interface/interface";

export default function Card(props: CardProps) {
    const color = getColorScheme();

    const cardStyle = () => {
        return {
            backgroundColor: color.background2,
            borderColor: color.accent,
            shadowColor: color.shadow,
        }
    }

    return (
        <View style={[styles.cardContainer, cardStyle()]}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        height: '50%',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        shadowOffset: {
            width: -5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },    
});
