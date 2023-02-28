import * as React from 'react'
import { Provider } from 'react-redux'
import FlashMessage from 'react-native-flash-message'

import { ConnectedApp } from './src/App'
import store from './src/store/configureStore'

const RootApp = () => {
  	return (
		<Provider store={store}>
			<ConnectedApp />
			<FlashMessage position="top" />
		</Provider>
  	)
}

export default RootApp
