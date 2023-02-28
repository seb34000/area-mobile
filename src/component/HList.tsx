import React, { useEffect } from "react";
import { FlatList } from "react-native";

export default function HList({ ...props }: any) {

    useEffect(() => {
        
    }, []);

    return (
        <FlatList
            style={{
                width: "100%",
                flex: 1,  
            }}
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
            horizontal
            data={props.data}
            renderItem={props.renderItem}
            {...props}
        />
    );
}