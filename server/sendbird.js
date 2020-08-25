import * as React from 'react';
import SendBird from 'sendbird';
import { SENDIRD_APP_ID } from 'react-native-dotenv';

class SendbirdSDK extends React.Component {
	constructor(props) {
		super(props);
		this.sb = SendBird.getInstance()
	}

	/*_init() {
		const sb = new SendBird({appId: SENDIRD_APP_ID});
	}*/


	async connect(uid) {
		sb.connect(uid, function(user, error) {
			if (error) {
				console.log(error);
				return;
			}
			return groupChannel;
		});
	}

	async disconnect() {
		sb.disconnect(function() {
			console.log("User disconnected from SendBird servers")
		});
	}

	async startConversation(uid1, uid2) {
		sb.GroupChannel.createChannelWithUserIds([uid1, uid2], false, this.uuidv4(), '', '', '', function(groupChannel, error) {
			if (error) {
				console.log(error);
				return;
			}
			//logic to send up conversation ID to firebase and store in a key, value pair
			return groupChannel;
		})
	}

	async endConversation(group_channel) {
		group_channel.leave(function(response, error){
			if (error) {
				console.log(error);
			}
		})
	}

	async sendMessage(sender_uid, message, group_channel) {
		if (!group_channel) group_channel =
	};

	uuidv4() {
  		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    		return v.toString(16);
  		});
  	}
}

sendbirdSDK = new SendbirdSDK();
export default sendbirdSDK