import React, { createRef, useRef } from 'react'
import { useEffect, useState } from 'react'

import { Text, StyleSheet, View, FlatList } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated'

import api from '../../lib/api/api'

import Button from '../../component/Button'
import { color } from 'react-native-reanimated'
import getColorScheme from '../../component/ColorsMode'
import ItemLinkable from './Local/ItemLinkable'
import { useFocusEffect } from '@react-navigation/native'
import typeApplication from '../../lib/interface/typeApplication'
import CModal from '../../component/Modal'
import { profile } from '../../store/action/userAction'
import ModalSetLink from './Local/ModalSetLink'

function LinkScreen(props: any) {
	const [services, setServices] = useState<typeApplication[]>([])
	const colors = getColorScheme()
	const transitionRef = createRef<TransitioningView>()
	const transition = <Transition.Change interpolation='easeInOut' />
	const dispatch = useDispatch()

	const [expandedId, setExpandedId] = useState(-1)
	const [modalVisible, setModalVisible] = useState(false)

	useFocusEffect(() => {
		setServices(props.user.aplications)
	})

	useEffect(() => {
		setServices(props.user.aplications)
	}, [])

	const onPress = () => {
		transitionRef.current?.animateNextTransition()
	}

	const updateExpandedId = (id: number) => {
		setExpandedId(id)
	}

	const onAddWebhook = async () => {
		const res = await api.profile(props.user.token)
		if (res.data.id) {
			setServices(res.data.applications)
			dispatch(profile(res.data.email, res.data.username, res.data.id, res.data.applications))
			console.log('Done')
		}
	}

	const renderItem = ({ item, index }: any) => {
		return (
			<ItemLinkable
				item={item}
				onPress={onPress}
				token={props.user.token}
				index={index}
				expandedId={expandedId}
				updateExpandedId={updateExpandedId}
				onAddWebhook={onAddWebhook}
			/>
		)
	}

	return (
		<Transitioning.View
			ref={transitionRef}
			transition={transition}
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			{services.length > 0 && (
				<FlatList
					ListHeaderComponent={() => (
						<View style={{ maxWidth: '50%', alignSelf: 'center', justifyContent: 'center' }}>
							<Button title='See your webhooks' onPress={() => setModalVisible(true)} />
						</View>
					)}
					data={services}
					renderItem={null}
					CellRendererComponent={renderItem}
					style={styles.list}
					keyExtractor={(item, index) => index.toString()}
				/>
			)}
			<ModalSetLink visible={modalVisible} close={() => setModalVisible(false)} app={props.user.aplications} />
		</Transitioning.View>
	)
}

const mapStateToProps = (state: any) => {
	return {
		...state,
	}
}

export default connect(mapStateToProps)(LinkScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	list: {
		flex: 1,
		width: '100%',
	},
})
