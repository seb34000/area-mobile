import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { WebView } from 'react-native-webview'
import Feather from "react-native-vector-icons/Feather";

import Button from '../component/Button'
import getColorScheme from '../component/ColorsMode'
import Input from '../component/Input'

import { login } from '../store/action/userAction'

import api from '../lib/api/api'
import PressableIcon from '../component/PressableIcon'
import GithubLogo from '../lib/assets/GithubLogo'
import InstagramLogo from '../lib/assets/InstagramLogo'
import Twitter from '../lib/assets/TwitterLogo'
import TwitterLogo from '../lib/assets/TwitterLogo'
import CModal from '../component/Modal'
import TwitchLogo from '../lib/assets/TwitchLogo'
import CoinbaseLogo from '../lib/assets/CoinbaseLogo'
import PhillipeHueLogo from '../lib/assets/PhillipHueLogo'
import RedditLogo from '../lib/assets/RedditLogo'
import { showMessage, hideMessage } from "react-native-flash-message";



// console.log(document.cookie, window.location);
// alert(window.location);
// window.ReactNativeWebView.console.log(document.cookie);
// alert(window.location);
const INJECTED_JAVASCRIPT = `setTimeout(() => {
    window.ReactNativeWebView.postMessage(document.cookie);
}, 500);`

export default function LoginScreen(props: any) {
	const color = getColorScheme()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [modalVisible, setModalVisible] = useState(false)

	const webview = React.useRef<WebView>(null)
	const [url, setUrl] = useState('')

	const onClick = async () => {
		console.log('Login')
		if (email === '' || password === '') {
			showMessage({message:'Please fill all the fields',
			type:'danger'
			})
			return
		}
		let res = await api.login(email, password)
		if (res.headers['set-cookie']) {
			const token: string = res.headers['set-cookie'][0].split(';')[0].split('=')[1]
			dispatch(login(token))
		} else {
			showMessage({
				message:'Network error: [' + res.status + '] ' + res.data.error + ' ' + res.data.message,
				type:'danger'
			})
		}
	}

	const githubConnect = async () => {
		console.log('Github connect')
		setUrl(`${api.api.getUri()}/auth/github`)
		setModalVisible(true)
	}

	const phillipeHueConnect = async () => {
		console.log('Phillipe Hue connect')
		setUrl(`${api.api.getUri()}/auth/hue`)
		setModalVisible(true)
	}

	const redditConnect = async () => {
		console.log('Reddit connect')

		setUrl(`${api.api.getUri()}/auth/reddit`)
		setModalVisible(true)
	}

	const twitterConnect = async () => {
		console.log('Twitter connect')
		setUrl(`${api.api.getUri()}/auth/twitter`)
		setModalVisible(true)
		const res = await api.twitter()
		console.log(res)
	}

	return (
		<ScrollView style={[{ flex: 1, backgroundColor: color.background }]} contentContainerStyle={{ flex: 1 }}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={[styles.container, { backgroundColor: color.background }]}
			>
				<CModal visible={modalVisible} onPressClose={() => setModalVisible(false)}>
					<WebView
						useWebView2={true}
						ref={webview}
						limitsNavigationsToAppBoundDomains={true}
						onContentProcessDidTerminate={webview.current?.reload}
						javaScriptCanOpenWindowsAutomatically
						// onShouldStartLoadWithRequest={(req) => {
						//     return true;
						// }}
						style={{ flex: 1 }}
						onError={(evt) => console.error('Error webview: ' + evt.nativeEvent)}
						source={{
							uri: `${url}`,
							headers: { 'Access-Control-Allow-Origin': '*' },
						}}
						originWhitelist={['*']}
						onNavigationStateChange={(event) => {
							console.log('onNavigationStateChange')
							console.log(JSON.stringify(event, null, 4))
							try {
								webview.current?.injectJavaScript(INJECTED_JAVASCRIPT)
							} catch (e) {
								console.log(e)
							}
						}}
						onMessage={(event) => {
							console.log('onMessage')
							if (event.nativeEvent.data.includes('access_token')) {
								setModalVisible(false)
								const token: string = event.nativeEvent.data.split(';')[0].split('=')[1]
								console.log(token)
								dispatch(login(token))
								setModalVisible(false)
							} else {
								console.error(JSON.stringify(event.nativeEvent.data, null, 4))
							}
						}}
					/>
				</CModal>
				<Feather name='user' size={24} color={color.accent} />
				<Input
					placeholder='Email'
					keyboardAppearance='default'
					keyboardType='default'
					style={{ width: '40%' }}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder='Password'
					keyboardAppearance='default'
					keyboardType='default'
					style={{ width: '40%' }}
					onChangeText={(text) => setPassword(text)}
				/>
				<Button title='Login' onPress={onClick} />
				<View style={{ flexDirection: 'row' }}>
					<PressableIcon icon={GithubLogo(color.accent, 24)} onPress={githubConnect} />
					<PressableIcon icon={PhillipeHueLogo(color.accent, 24)} onPress={phillipeHueConnect} />
					{/* <PressableIcon
                        icon={RedditLogo(color.accent, 24)}
                        onPress={redditConnect}
                    /> */}
					<PressableIcon icon={TwitterLogo(color.accent, 24)} onPress={twitterConnect} />
					{/* <PressableIcon
                        icon={TwitchLogo(color.accent, 24)}
                        onPress={() => alert("Twitch connect")}
                    /> */}
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
