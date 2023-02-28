import React, { Dispatch, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import typePickerProps from '../lib/interface/typePickerProps'
import getColorScheme from './ColorsMode'

export default function Picker(props: typePickerProps) {
	const colors = getColorScheme()
	return (
		<DropDownPicker
			open={props.open}
			value={props.value}
			items={props.items}
			setOpen={props.setOpen}
			setValue={props.setValue}
			setItems={props.setItems}
			theme={colors.is === 'dark' ? 'DARK' : 'LIGHT'}
			listMode='SCROLLVIEW'
			placeholder={props.placeholder}
			disabled={props.disabled}
			disabledStyle={{ backgroundColor: colors.background }}
			style={props.style}
			zIndex={props.zIndex}
			zIndexInverse={props.zIndexInverse}
			dropDownContainerStyle={{ zIndex: 10000, elevation: 1000 }}
		/>
	)
}
