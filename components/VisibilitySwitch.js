import * as React from 'react'
import { Switch, View, Text } from 'react-native'

export const VisibilitySwitch = (props) => (
	<View style={{flexDirection: "row"}} >
		<Text>Visible</Text>
		<Switch />
	</View>

	)