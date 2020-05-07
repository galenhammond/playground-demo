import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'; 

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
				<View style={{padding: "7%"}}>
					<SimpleLineIcons name="clock" size={20} color="black" />
				</View>
				<View>
					<Text style={{fontSize: "17%"}}>{props.timer}</Text>
				</View>
			</View>

		</View>
		)
}

const styles = StyleSheet.create({
	container: {
		padding: "10%"
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
		padding: "2%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		position: 'relative', width: '45%', left: '50%',
		flex: 1,
		fontFamily: "comfortaa-light",

	}
});