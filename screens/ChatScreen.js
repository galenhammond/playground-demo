import * as React from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import { AuthContext } from '../navigation/AuthProvider'
import { withMappedNavigationParams } from 'react-navigation-props-mapper';

function ChatScreen(props) {
	const { currentUser, currentUserDocument } = React.useContext(AuthContext);
	const [userTypedMessage, setUserTypedMessage] = React.useState();
	const [messages, updateMessages] = React.useState([
		{
			_id: currentUser.uid,
	        text: 'Just checking in!',
	        createdAt: new Date(),
	        user: {
	            _id: props.matchDocument.id,
	            name: props.matchDocument.name,
	            avatar: props.matchDocument.thumbnail,
	        },
        },
    ]);

    const _onSend = (newMessage = []) => {
    	updateMessages(GiftedChat.append(messages, newMessage));
 	}
 	
 	React.useEffect(() => {
 		props.navigation.setOptions({title: props.matchDocument.name});
 	}, [])

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
        	onSend={messages => _onSend(messages)}
        	user={{
          	_id: currentUser.uid,
          	name: currentUserDocument.name,
          	avatar: currentUserDocument.thumbnail
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