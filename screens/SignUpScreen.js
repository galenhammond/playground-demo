import * as React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'; 

export default function SignUpScreen(props) {
	const [userFirstName, setUserFirstName] = React.useState();
	const [userAge, setUserAge] = React.useState();
	const [userEmail, setUserEmail] = React.useState();
	const [userPictures, setUserPictures] = React.useState({});
	const [userPicturesUploaded, setUploaded] = React.useState(false);
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Let's get you setup</Text>
			</View>
			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Name</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'John Smith'} 
				 onChange={val => setUserFirstName(val)} textAlign={'center'} />
			</View>
			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Age</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'22'} 
				 onChange={val => setUserAge(val)} textAlign={'center'} />
			</View>
			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Email</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'john.smith@playground.ca'} 
				 onChange={val => setUserEmail(val)} textAlign={'center'} />
			</View>
			<View style={styles.subTitleContainer}>
			</View>
			<View style={styles.inputContainer}>
				<Button title={"Upload Pictures"} type={"clear"} />
				{//onPress: some logic to upload user pictures, set uplaoded state to true
				}
			</View>
			<View style={styles.buttonContainer}>
				{userPicturesUploaded ? <Button title={"Continue"} type={"clear"} />
				: <Button disabled title={"Continue"} type={"clear"} /> }
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'space-between'
	}, 
	titleContainer: {
		alignItems: 'center',
	},
	titleText: {
		paddingTop: '20%',
		color: '#000000',
		fontFamily: "comfortaa-light",
		fontSize: 28,
	},
	subTitleContainer: {
		alignItems: 'center',
		width: '80%',
	},
	subTitleText: {
		color: 'black',
		fontFamily: "sfprodisplay-light",
		fontSize: 20,
	},
	inputContainer: {
		width: '100%',
		alignItems: 'center',
	},
	inputText: {
		fontFamily: "sfprodisplay-light",
		width: '70%',
		color: '#757E90',
		borderBottomWidth: 1,
		borderRadius: 20,
		borderColor: '#D8D8D8',
		fontSize: 21,

	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 20
	}
})