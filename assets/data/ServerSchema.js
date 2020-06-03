//Example Firebase Schema


const root = {
	users: {
		uid: {
			name: '',
			age: 0,
			gender: '',
			bio: ',
			thumbnail: null,
			images: [],
			location: null,
			matches: [{
				id: '',
				conversation: {},
				matchTime: 0	
			}],
		}
	},
	conversations: {
		lowerId_higherId: {
			messages: [{
				timestamp: 0,
				sentBy: '',
				text: ''
			}],
			lastMessage: {},
		}
	}
}