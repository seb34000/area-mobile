import * as React from 'react'
import { View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabBarIconProps, screenOptionProps } from './lib/interface/interface'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'

// import Ionicons from '@expo/vector-icons/Ionicons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import getColorScheme from './component/ColorsMode';

import HomeScreen from './View/HomeScreen';
import LinkScreen from './View/Link/LinkScreen';
import ProfileScreen from './View/Profile/ProfileScreen'
import LogoutScreen from './View/LogoutScreen'

import LoginScreen from './View/LoginScreen'
import RegisterScreen from './View/RegisterScreen'

import { IconProps } from 'react-native-vector-icons/Icon'

const Tab = createBottomTabNavigator()

function MainNavigation({ user }: any) {
	const color = getColorScheme()
	const screenOption = ({ route }: screenOptionProps) => ({
		tabBarIcon: ({ focused, color, size }: tabBarIconProps) => {
			let iconName: string | undefined

			if (route.name === 'Home') {
				iconName = focused ? 'ios-home' : 'ios-home-outline'
			} else if (route.name === 'Logout') {
				iconName = focused ? 'logout' : 'logout'
				//@ts-ignore
				return <AntDesign name={iconName} size={size} color={color} />
			} else if (route.name === 'Login') {
				iconName = focused ? 'account-arrow-up' : 'account-arrow-up-outline'
				//@ts-ignore
				return <MaterialCommunityIcons name={iconName} size={24} color={color} />
			} else if (route.name === 'Register') {
				iconName = focused ? 'account-plus' : 'account-plus-outline'
				//@ts-ignore
				return <MaterialCommunityIcons name={iconName} size={size} color={color} />
			} else if (route.name === 'Profile') {
				iconName = focused ? 'person' : 'person-outline'
			} else if (route.name === 'Link') {
				iconName = focused ? 'link' : 'link-outline'
			}
			//@ts-ignore
			return <Ionicons name={iconName} size={size} color={color} />
		},
		tabBarShowLabel: true,
		tabBarHideOnKeyboard: true,
		tabBarStyle: {
			borderTopColor: color.background,
			borderTopWidth: 0,
			borderBottomWidth: 0,
			borderRadius: 50,
			margin: 10,
			position: 'absolute',
			shadowColor: color.shadow, //.is === 'light' ? '#1c1c1c' : 'grey',
			shadowOffset: {
				width: 1,
				height: 3,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 1,
			// justifyContent: "center",
			alignItems: 'center',
			alignContent: 'center',
			alignSelf: 'center',
		},

		// headerShown: false,
		tabBarBackground: () => (
			<View
				style={{
					backgroundColor: color.background,
					height: Platform.OS === 'ios' ? '75%' : '100%',
					width: '100%',
					borderRadius: 50,
					// alignContent: "center",
					// justifyContent: "center",
					// alignItems: "center",
					// alignSelf: "center",
				}}
			/>
		),
		tabBarActiveTintColor: color.accent,
		tabBarInactiveTintColor: color.inactive,
		headerBackground: () => (
			<View
				style={{
					backgroundColor: color.background,
					height: '100%',
					alignItems: 'center',
				}}
			/>
		),
		headerTintColor: color.text,
	})

	return (
		// <NavigationContainer>
		<View
			style={{
				backgroundColor: color.background,
				height: '100%',
				width: '100%',
				position: 'absolute',
			}}>
			{/* @ts-ignore */}
			<Tab.Navigator screenOptions={screenOption}>
				{user.isLogged ? (
					<>
						<Tab.Screen
							name='Home'
							component={HomeScreen}
							options={{ title: 'Home', headerShown: false }}
						/>
						<Tab.Screen name='Link' component={LinkScreen} options={{ title: 'Link' }} />
						<Tab.Screen name='Profile' component={ProfileScreen} options={{ title: 'Profile' }} />
						<Tab.Screen name='Logout' component={LogoutScreen} options={{ title: 'Logout' }} />
					</>
				) : (
					<>
						<Tab.Screen name='Register' component={RegisterScreen} options={{ title: 'Register' }} />
						<Tab.Screen name='Login' component={LoginScreen} options={{ title: 'Login' }} />
					</>
				)}
			</Tab.Navigator>
			
		</View>
		// </NavigationContainer>
	)
}

function App(props: any) {
	return (
		<NavigationContainer>
			<MainNavigation {...props} />
		</NavigationContainer>
	)
}

const mapStateToProps = (state: any, props: any) => {
	return {
		// isLogged: state.isLogged,
		// user: state.user
		...state,
		...props,
	}
}

export const ConnectedApp = connect(mapStateToProps)(App)
