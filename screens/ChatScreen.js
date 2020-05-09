import * as React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native'

export default function ChatScreen(props) {
	const [userTypedMessage, setUserTypedMessage] = React.useState();
	return (
		<SafeAreaView style={styles.container}>
			<Text>ChatScreen</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1
	},
});