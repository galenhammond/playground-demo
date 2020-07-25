import * as React from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { AuthContext } from '../navigation/AuthProvider'

export default function SetupUserScreen(props) {
	const { user } = React.useContext(AuthContext);
	const [userDetails, setUserDetails] = React.useState(null);

	return (
		<SafeAreaView style={styles.container}>
	      <View style={{
	      	justifyContent: 'center',
	      	paddingTop: "1%",
	      }}>
	      	<View style={{
	      		borderColor: "#D8D8D8",
	      		paddingBottom: "7%",
	      		borderBottomWidth: 1,
	      		alignItems: "center",
	      		justifyContent:"center"}}>
	      		<Button title={isEditing ? 'Done' : 'Edit'} type={"clear"} onPress={onEditPress}/>
	      		<TouchableOpacity>
			      	<Avatar rounded
			      	showAccessory={true}
			      	title={props.name[0].toUpperCase()}
			      	size={120} 
			      	source={props.image}
			      	onPress={() => props.navigation.navigate('Upload Photos')} />
			    </TouchableOpacity>

		      	<Text style={{fontFamily: "comfortaa-regular", fontSize: 26,
		      	alignSelf: "center",
		      	marginBottom: "2%", 
		      	marginTop: "3.5%"}}>{currentUser ? currentUser.displayName : null}</Text> }

		      	<Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", marginBottom: "2%", color: "#757E90"}}>{currentUserDocument ? currentUserDocument.age : null}</Text> }
		      	
		      	<TextInput onSubmitEditing={() => setEditing(false)} style={{fontFamily: "sfprodisplay-light", fontSize: 16, textAlign: "center", color: '#292929'}}>{props.bio}</TextInput>
	  			
	  			<View style={{
		      		flexDirection: 'row',
		      		flexGrow: 1,
		      		alignItems: "center",
	      			justifyContent:"space-even",
	      			marginTop: "3.5%",
	      			 }}>
	      			 { userVisible ?
					<Text style={{paddingRight: 10, color: SYSTEM_GREEN}}>Visible</Text> 
					: <Text style={{paddingRight: 10, color: "#757E90" }}>Visible</Text> 
					}
					<Switch value={userVisible} onValueChange={val => {setUserVisible(val)} }/>
				</View>
	      	</View>
	      </View>
	    </SafeAreaView>

	);
}