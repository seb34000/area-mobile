import React, { useEffect } from 'react'

import { SectionList, View, Text } from 'react-native'
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker'
import Button from '../../../component/Button'
import getColorScheme from '../../../component/ColorsMode'
import PressableIcon from '../../../component/PressableIcon'
import api from '../../../lib/api/api'
import ChevronDownLogo from '../../../lib/assets/ChevronDownLogo'
import ChevronUpLogo from '../../../lib/assets/ChevronUpLogo'
import { UserState } from '../../../lib/interface/interface'
import { typeSection, typeWebhook } from '../../../lib/interface/typeSection'

interface Props {
	webhooks: typeSection[]
	user: UserState
}

export default function WebhooksCard(props: Props) {
	const colors = getColorScheme()

	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState(null)
	const [items, setItems] = React.useState<ItemType<any>[]>([])
	const [loading, setLoading] = React.useState(true)

	const [openIndex, setOpenIndex] = React.useState(-1)

	useEffect(() => {
		console.log('focus')
		const tmp: { label: string; value: string; parent?: string }[] = []
		if (props.webhooks.length === 0) return
		props.webhooks.forEach((section) => {
			section.reactions.forEach((reactionApp, index) => {
				const appNames = reactionApp.name
				tmp.push({
					label: appNames.toLocaleUpperCase(),
					value: appNames + index,
				})
				reactionApp.reactions.forEach((reaction) => {
					const reactType = reaction.type
					reaction.actions.forEach((action) => {
						tmp.push({
							label: reactType + ' - ' + action,
							value: reactType + ' : ' + action,
							parent: appNames + index,
						})
					})
				})
			})
		})
		setItems(tmp)
	}, [])

	useEffect(() => {
		if (items.length > 0) {
			setLoading(false)
		}
	}, [items])

	return (
		<SectionList
			sections={props.webhooks}
			renderItem={(item) => {
				return (
					<View
						style={{
							margin: 5,
							backgroundColor: colors.background2,
							padding: 5,
							borderRadius: 5,
							alignItems: 'center',
						}}
					>
						<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
							<Text style={{ color: colors.text, fontSize: 20, fontWeight: '800' }}>{item.item}</Text>
							<PressableIcon
								onPress={() => {
									if (item.index === openIndex) setOpenIndex(-1)
									else setOpenIndex(item.index)
								}}
								icon={
									item.index === openIndex
										? ChevronUpLogo(colors.text, 40)
										: ChevronDownLogo(colors.text, 40)
								}
							/>
						</View>
						{openIndex === item.index && (
							<View>
								<DropDownPicker
									open={open}
									value={value}
									items={items}
									setOpen={setOpen}
									setValue={setValue}
									setItems={setItems}
									placeholder='Select an item'
									loading={loading}
									ActivityIndicatorComponent={() => <Text>loading</Text>}
									categorySelectable={false}
									listParentLabelStyle={{ fontWeight: 'bold' }}
									theme={colors.is === 'dark' ? 'DARK' : 'LIGHT'}
									ListEmptyComponent={() => <Text>Empty, add more app to get more action</Text>}
								/>
								<Button
									title='Add'
									onPress={() => {
										const parent: string = items.find((item) => item.value === value)?.parent
										// console.error(parent.includes('hue'))
										if (parent.includes('hue')) {
											const type = items
												.find((item) => item.value === value)
												?.value.split(' : ')[0]
											const action = items
												.find((item) => item.value === value)
												?.value.split(' : ')[1]
											const app: any = props.user.aplications.find(
												(app: any) => app.name === 'Hue'
											)
											// const webhook
											// alert(JSON.stringify(item.section.webhooks))
											// console.error(item.item)
											const is = item.item.split(' - ')[0]
											const evt = item.item.split(' - ')[1]
											// console.error(is + ' ' + evt)
											const webhook: typeWebhook | undefined = item.section.webhooks.find(
												(e) => e.event === evt && e.argument === is
											)
											if (webhook === undefined) {
												alert('Webhook not found')
												return
											}
											// alert(JSON.stringify(webhook?.id))
											api.actionHue(props.user.token, type, action, app.external, webhook.id)
										}
									}}
								/>
							</View>
						)}
					</View>
				)
			}}
			renderSectionHeader={({ section: { title } }) => {
				return (
					<View style={{ marginTop: 5, backgroundColor: colors.background2, padding: 5, borderRadius: 5 }}>
						<Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
					</View>
				)
			}}
			keyExtractor={(item, index) => item + index}
		/>
	)
}
