import * as React from 'react';
import {View, SafeAreaView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import firebaseSDK from '../server/fire.js';
import { AuthContext } from '../navigation/AuthProvider';
import styles from '../assets/styles';

export default function SignInPage(props) {
	const [userCredentials, setUserCredentials] = React.useState({email: '', password: ''});
	const { login } = React.useContext(AuthContext);

	const _onSignIn = (user) => {
		/*OAuth verification logic*/
		login(user, 
			/*onSuccess callback*/
			() => {
				props.storePersistenceToken();
			}, e => console.log(e)
		);
	}
	return (
		<SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
			<KeyboardAvoidingView style={_styles.container} behavior="padding" enabled keyboardVerticalOffset={110}>

				<View style={_styles.titleContainer}>
					<Text style={_styles.titleText}>playground</Text>
				</View>

				<View style={styles.containerEditProfileItem}>
			      	<View style={_styles.subTitleContainer}>
						<Text style={_styles.subTitleText}>Email</Text>
					</View>
					<View style={_styles.inputContainer}>
						<TextInput style={_styles.inputText} placeholder={'john.smith@playground.ca'} 
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

					<View style={_styles.subTitleContainer}>
						<Text style={_styles.subTitleText}>Password</Text>
					</View>

					<View style={_styles.inputContainer}>
						<TextInput style={_styles.inputText} 
						placeholder={'*******'} 
						secureTextEntry={true}
						 onChangeText={val => {
						 	const password = val; 
						 	setUserCredentials(prevState => {
						 		return {...prevState, password: password}
						 	});
						 }} 
						 textAlign={'center'}
						 autoCapitalize={'none'} />
					</View>
				</View>

				<TouchableOpacity style={styles.themeButtonItem} onPress={() => _onSignIn(userCredentials)}>
			    	<Text style={styles.confirmationButtonText}>Sign In</Text>
			    </TouchableOpacity>

			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const _styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
	}, 
	titleContainer: {
		alignItems: 'center',
		paddingVertical: 65
	},
	titleText: {
		color: '#000000',
		fontFamily: "comfortaa-regular",
		fontSize: 40,
	},
	subTitleContainer: {
		paddingVertical: 50,
		alignSelf: 'center',
		width: '80%',
	},
	subTitleText: {
		textAlign: 'center',
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
		width: '90%',
		color: '#757E90',
		borderBottomWidth: 0.3,
		borderRadius: 20,
		borderColor: '#D8D8D8',
		fontSize: 21,

	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 50
	},
});