import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { PillTimer } from '../components/PillTimer'
import Timer from '../components/MessageTimer'

export const MatchCounter = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.counter}>{props.counter}</Text>
			</View>
			<View>
				<Text style={styles.footer}>new matches</Text>
			</View>
			<View style={styles.timer}>
				<SimpleLineIcons name="clock" size={20} color={'#757E90'} style={{paddingRight: "2%"}}/>
				<Timer />
			</View>

		</View>
		)
}
const styles = StyleSheet.create({
	container: {
		padding: "6%"
	},
	innerContainer: {
		padding: "3%"
	},
	counter: {
		fontFamily: "comfortaa-regular",
		fontSize: 48,
		justifyContent: "center",
		alignSelf: "center"
	},
	footer: {
		fontFamily: "comfortaa-regular",
		fontSize: 21,
		justifyContent: "center",
		alignSelf: "center"
	},
	timer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		paddingTop: "8%",
		fontFamily: "comfortaa-light",

	}
});