import * as React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';

export default function ChatScreen(props) {
	const [userTypedMessage, setUserTypedMessage] = React.useState();
	const [messages, updateMessages] = React.useState([
		{
			_id: 1,
	        text: 'Just checking in!',
	        createdAt: new Date(),
	        user: {
	            _id: 2,
	            name: 'React Native',
	            avatar: 'https://placeimg.com/140/140/any',
	        },
        },
    ]);

    const onSend = (newMessage = []) => {
    	updateMessages(GiftedChat.append(messages, newMessage));
 	}

	return (
		<SafeAreaView style={styles.container}>
			<GiftedChat
			messages={messages}
        	onSend={messages => onSend(messages)}
        	user={{
          	_id: 1,
        	}} 
        	/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1
	},
});