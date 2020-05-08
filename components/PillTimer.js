import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const SYSTEM_GREEN = '#30bf54'
const SYSTEM_YELLOW = '#ffcc00'
const SYSTEM_RED = '#ff3a30'


export const PillTimer = (props) => (
	<View style={styles.container}>
		<Text style={styles.pillTimer}>{props.time}</Text>
	</View>

);

	const styles = StyleSheet.create({
		container: {
			borderRadius: 10,
			borderWidth: 1,
			borderColor: SYSTEM_GREEN,
		    paddingLeft: 4,
		    paddingRight: 4
		},
		pillTimer: {
			color: SYSTEM_GREEN,
			fontFamily: "sfprodisplay-medium",
			fontSize: 12
		}
	});