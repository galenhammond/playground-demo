import * as React from 'react';
import {View, SafeAreaView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import firebaseSDK from '../server/fire.js';

export default function SignInPage(props) {
	const [userCredentials, setUserCredentials] = React.useState({email: '', password: ''});

	const _onSignIn = (user) => {
		/*OAuth verification logic*/
		firebaseSDK.loginUser(user, 
			/*onSuccess callback*/
			async (success) => {
				props.userSignedIn(true);
				props.navigation.navigate("Playground");
			}, e => console.log(e)
		);
	}
	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Sign In</Text>
			</View>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Email</Text>
			</View>

			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'Enter email'} 
				 onChangeText={val => {
				 	const email = val; 
				 	setUserCredentials(prevState => {
				 		return {...prevState, email: email}
				 	});
				 }}  
				 textAlign={'center'}
				 autoCapitalize={'none'}
				 keyboardType={'email-address'} />
			</View>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Password</Text>
			</View>

			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'Enter password'} 
				 onChangeText={val => {
				 	const password = val; 
				 	setUserCredentials(prevState => {
				 		return {...prevState, password: password}
				 	});
				 }} 
				 textAlign={'center'}
				 autoCapitalize={'none'} />
			</View>

			<View style={styles.buttonContainer}>
				<Button title={"Sign In"} type={"clear"} onPress={() => _onSignIn(userCredentials)}/>
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
});