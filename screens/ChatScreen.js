import * as React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

function ChatScreen(props) {
	//TODO: Push user avatar and name to GiftedChat
	const [userTypedMessage, setUserTypedMessage] = React.useState();
	const [messages, updateMessages] = React.useState([
		{
			_id: 1,
	        text: 'Just checking in!',
	        createdAt: new Date(),
	        user: {
	            _id: 2,
	            name: 'Galen',
	            avatar: props.avatar,
	        },
        },
    ]);

    const onSend = (newMessage = []) => {
    	updateMessages(GiftedChat.append(messages, newMessage));
 	}
 	
	return (
		<SafeAreaView style={styles.container}>
			<GiftedChat
			alwaysShowSend
			showUserAvatar
			textInputStyle={{
				borderRadius: 20,
				borderWidth: 0.3,
				borderColor: "#D8D8D8",
				paddingHorizontal: "2%",
				paddingTop: '2.5%',
				paddingVertical: "2%",
				justifyContent: "center",
				alignSelf: "center"
			}}
			placeholder={"Say Hi!"}
			messages={messages}
        	onSend={messages => onSend(messages)}
        	user={{
          	_id: 1,
          	name: "Michelle",
          	avatar: props.avatar
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
export default withMappedNavigationParams()(ChatScreen);