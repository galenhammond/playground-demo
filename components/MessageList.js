import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export const MatchCounter = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.counter}>{props.counter}</Text>
			</View>
			<View>
				<Text style={styles.footer}>new matches</Text>
			</View>
		</View>
		)
}