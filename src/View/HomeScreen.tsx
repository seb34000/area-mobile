import React from 'react'
import { useEffect, useState } from 'react'
import {
	KeyboardAvoidingView,
	Text,
	StyleSheet,
	useColorScheme,
	Platform,
	ScrollView,
	Dimensions,
	StatusBar,
	TouchableOpacity,
	Alert,
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import getColorScheme from '../component/ColorsMode'

import Button from '../component/Button'
import Input from '../component/Input'
import Card from '../component/Card'
import { connect, useDispatch, useSelector } from 'react-redux'
import api from '../lib/api/api'
import { profile } from '../store/action/userAction'
import { View } from 'react-native'
import HList from '../component/HList'
import GithubLogo from '../lib/assets/GithubLogo'
import TwitterLogo from '../lib/assets/TwitterLogo'
import InstagramLogo from '../lib/assets/InstagramLogo'
import TwitchLogo from '../lib/assets/TwitchLogo'
import CoinbaseLogo from '../lib/assets/CoinbaseLogo'
import PhillipeHueLogo from '../lib/assets/PhillipHueLogo'
import RedditLogo from '../lib/assets/RedditLogo'
import JsonService from '../lib/assets/service.json'

import { useFocusEffect } from '@react-navigation/native'

function HomeScreen(props: any) {
	const color = getColorScheme()
	const user = props.user //useSelector((state: any) => state.user);
	const dispatch = useDispatch()
	const [services, setServices] = useState([])
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')

	useFocusEffect(() => {
		console.log('Focus Home')
		// console.log(JSON.stringify(props.user.aplications, null, 4));

		if (services !== props.user.aplications) setServices(props.user.aplications)
	})

	useEffect(() => {
		console.log('HomeScreen')
		StatusBar.setHidden(true, 'fade')
		console.log(JSON.stringify(props.user, null, 4))

		const getServices = async () => {
			const res = await api.profile(user.token)
			console.log(JSON.stringify(res.data, null, 4))
			if (res.data.id) {
				setServices(res.data.applications)
				dispatch(profile(res.data.email, res.data.username, res.data.id, res.data.applications))
			}
		}
		if (!user.username) {
			getServices()
		}
	}, [])

	const onSelectItem = (item: any) => {
		if (services.find((service: any) => service.name === item.toString())) {
			let currentService = JsonService.find((servicetype) => servicetype.name === item.toString())
			console.log(currentService)
			if (currentService !== undefined) {
				setTitle(currentService.name)
				setBody(currentService.body)
				console.log(currentService.name)
				console.log(currentService.body)
			} else {
				setTitle('No service found')
				setBody('This should not happen')
			}
		} else {
			Alert.alert("You don't have this service", 'Do you want to add it?', [
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'destructive',
				},
				{
					text: 'Add new service',
					onPress: () => props.navigation.navigate('Profile'),
					style: 'cancel',
				},
			])
		}
	}

	const renderItems = ({ item }: any) => {
		let icon = null
		switch (item.toString()) {
			case 'Reddit':
				icon = RedditLogo(color.accent, 24)
				break
			case 'Github':
				icon = GithubLogo(color.accent, 24)
				break
			case 'Instagram':
				icon = InstagramLogo(color.accent, 24)
				break
			case 'Twitter':
				icon = TwitterLogo(color.accent, 24)
				break
			case 'Hue':
				icon = PhillipeHueLogo(color.accent, 24)
				break
		}

		return (
			<TouchableOpacity
				style={{
					width: Dimensions.get('window').width / 6.5,
					height: Dimensions.get('window').width / 6.5,
					backgroundColor: color.background2,
					borderRadius: 10,
					justifyContent: 'center',
					alignItems: 'center',
					margin: 5,
					borderWidth: 1,
					borderColor: color.accent,
				}}
				onPress={() => onSelectItem(item)}
			>
				{icon ? icon : <Text style={{ color: color.accent, padding: 10 }}>{String(item).substring(0, 1)}</Text>}
			</TouchableOpacity>
		)
	}

	return (
		<View style={[styles.container, { backgroundColor: color.background }]}>
			<View
				style={[
					styles.header,
					{
						backgroundColor: color.background,
						shadowColor: color.shadow,
					},
				]}
			>
				<View style={[{ flex: 1 }, styles.headerContainer]}>
					<HList data={['Github', 'Hue', 'Reddit', 'Instagram', 'Twitter']} renderItem={renderItems} />
				</View>
			</View>
			<View
				style={[
					styles.body,
					{
						backgroundColor: color.background2,
						shadowColor: color.shadow,
					},
				]}
			>
				<Text style={[styles.itemTitle, { color: color.text }]}>{title}</Text>
				<Text style={[styles.itemBody, { color: color.text }]}>{body}</Text>
			</View>
		</View>
	)
}

const mapStateToProps = (state: any, props: any) => {
	return {
		...state,
	}
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},

	header: {
		flex: 0.15,
		borderBottomStartRadius: 20,
		borderBottomEndRadius: 20,
		shadowOffset: {
			width: 1,
			height: 3,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	body: {
		flex: 0.72,
		margin: 10,
		marginTop: 20,
		borderRadius: 10,
		shadowOffset: {
			width: 1,
			height: 3,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	itemTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	itemBody: {
		fontSize: 16,
	},
})
