import * as React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

export default function ChatScreen(props) {
	const [userTypedMessage, setUserTypedMessage] = React.useState();
	const [messages, updateMessages] = React.useState([]);
	
	return (
		<SafeAreaView style={styles.container}>
			<GiftedChat />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1
	},
});