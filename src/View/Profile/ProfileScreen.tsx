import React, { useContext, useEffect, useState } from 'react'

import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	FlatList,
	Alert,
	ActivityIndicator,
	Platform,
} from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import Button from '../../component/Button'
import getColorScheme from '../../component/ColorsMode'
import Modal from 'react-native-modal'
import Input from '../../component/Input'
import api from '../../lib/api/api'
import { logout, profile } from '../../store/action/userAction'
import GithubLogo from '../../lib/assets/GithubLogo'
import PressableIcon from '../../component/PressableIcon'
import AntDesign from "react-native-vector-icons/AntDesign";
import PhillipeHueLogo from '../../lib/assets/PhillipHueLogo'
import CModal from '../../component/Modal'
import EditProfileModal from './Local/editProfileModal'
import AddApplicationModal from './Local/addApplicationModal'
import useForceUpdate from '../../lib/effect/ForceUpdate'
import typeApplication from '../../lib/interface/typeApplication'

function ProfileScreen(props: any) {
	const color = getColorScheme()

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [applications, setApplications] = useState<typeApplication[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const dispatch = useDispatch()

	const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)
	const [addApplicationModalVisible, setAddApplicationModalVisible] = useState(false)
	const [webviewModalVisible, setWebviewModalVisible] = useState(false)

	useEffect(() => {
		console.log('Profile')
		setUsername(props.user.username)
		setEmail(props.user.email)
		setApplications(props.user.aplications)
		// console.log(JSON.stringify(props.user.aplications));
	}, [])

	useEffect(() => {
		if (applications && isLoading && username) {
			setIsLoading(false)
		}
	}, [applications])

	const renderAppItem = ({ item }: any) => {
		return (
			<View style={styles.appItem}>
				<Text
					style={[
						styles.name,
						styles.nameShadow,
						{
							color: color.text,
							shadowColor: color.shadow,
							borderColor: color.accent,
							backgroundColor: color.background,
						},
					]}
				>
					{item.name}
				</Text>
				<PressableIcon
					icon={<AntDesign name='delete' size={24} color={color.accent} />}
					onPress={() =>
						Alert.alert(
							'Delete application',
							`Are you sure you want to delete this application: [${item.name}] ?`,
							[
								{
									text: 'Cancel',
									style: 'cancel',
								},
								{
									text: 'Delete',
									onPress: async () => {
										const res = await api.deleteApplication(props.user.token, item.name)
										if (res) {
											setApplications(applications.filter((elem: any) => elem.name !== item.name))
											dispatch(
												profile(
													email,
													username,
													props.user.id,
													applications.filter((elem) => elem.name !== item.name)
												)
											)
										}
									},
									style: 'destructive',
								},
							]
						)
					}
				/>
			</View>
		)
	}
	const renderProfile = () => {
		return (
			<>
				<View
					style={[
						styles.header,
						{
							backgroundColor: color.background2,
							shadowColor: color.shadow,
						},
					]}
				>
					<View style={styles.headerContent}>
						<View style={[styles.avatar, { borderColor: color.text }]}>
							{username.length > 0 && (
								<Text style={[styles.avatarText, { color: color.text }]}>
									{username.toString()[0].toUpperCase()}
								</Text>
							)}
						</View>
						<Text style={[styles.name, { color: color.text }]}>{username}</Text>
						<Text style={[styles.userInfo, { color: color.text }]}>{email || 'Email not registered'}</Text>
						<Button title='Edit profile' onPress={() => setEditProfileModalVisible(true)} />
					</View>
				</View>
				<View style={[styles.body, { backgroundColor: color.background }]}>
					<View style={styles.bodyContent}>
						<FlatList
							data={applications}
							ListHeaderComponent={() => (
								<Text
									style={[
										styles.name,
										{
											textAlign: 'center',
											color: color.text,
										},
									]}
								>
									Application connected
								</Text>
							)}
							renderItem={renderAppItem}
							ListFooterComponent={() => (
								<Button title='+ Add application' onPress={() => setAddApplicationModalVisible(true)} />
							)}
						/>
					</View>
				</View>
			</>
		)
	}

	return (
		<View style={[styles.container, { backgroundColor: color.background }]}>
			{!isLoading ? (
				<>
					{renderProfile()}
					<EditProfileModal
						modalVisible={editProfileModalVisible}
						closeModal={() => setEditProfileModalVisible(false)}
						setUsername={setUsername}
						setEmail={setEmail}
						user={props.user}
						email={email}
						username={username}
					/>
					<AddApplicationModal
						modalVisible={addApplicationModalVisible}
						closeModal={() => setAddApplicationModalVisible(false)}
						user={props.user}
						setApplications={setApplications}
					/>
				</>
			) : (
				<ActivityIndicator size='large' color={color.accent} />
			)}
		</View>
	)
}

const mapStateToProps = (state: any, props: any) => {
	return {
		...state,
	}
}

export default connect(mapStateToProps)(ProfileScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	header: {
		margin: 5,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 10,
	},

	headerContent: {
		padding: 20,
		alignItems: 'center',
	},

	avatar: {
		width: 150,
		height: 150,
		borderRadius: 80,
		borderWidth: 4,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	avatarText: {
		fontSize: 120,
		fontWeight: '600',
		padding: 0,
		marginTop: Platform.OS === 'ios' ? 0 : -8,
	},

	name: {
		fontSize: 22,
		fontWeight: '600',
		padding: 5,
	},

	nameShadow: {
		padding: 10,
		// borderRadius: 5,
		// margin: 10,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	userInfo: {
		fontSize: 16,
		color: '#FFFFFF',
		fontWeight: '600',
		padding: 5,
	},

	body: {
		backgroundColor: '#778899',
		alignItems: 'center',
		flex: 1,
	},

	bodyContent: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
	},

	appItem: {
		width: '100%',
		borderBottomColor: 'lightgrey',
		borderBottomWidth: 1,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
