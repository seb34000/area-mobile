import React from 'react'
import { PressableStateCallbackType } from 'react-native'
import { ButtonProps, StyleSheet, Pressable, Text } from 'react-native'
import getColorScheme from './ColorsMode'

export default function Button({ onPress, title, ...props }: ButtonProps) {
	const color = getColorScheme()

	const buttonStyle = (isPress: boolean) => {
		if (props.disabled === true) {
			return {
				backgroundColor: color.inactive,
				borderColor: color.inactiveBorder,
			}
		}
		return {
			backgroundColor: isPress ? color.accent + '80' : color.accent,
			shadowColor: color.shadow,
			borderColor: color.accent,
		}
	}

	const textStyle = () => {
		return {
			color: color.text,
		}
	}

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }: PressableStateCallbackType) => [buttonStyle(pressed.valueOf()), styles.button]}
			{...props}
		>
			<Text style={[textStyle(), styles.text]}>{title}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderRadius: 5,
		margin: 10,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	text: {
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
})
