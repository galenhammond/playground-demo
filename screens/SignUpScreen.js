import * as React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { AuthContext } from '../navigation/AuthProvider';
import firebaseSDK from '../server/fire'

export default function SignUpScreen(props) {
	const [userCredentials, setUserCredentials] = React.useState({email: '', password: ''});
	const [userData, setUserData] = React.useState({})
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
	const { register } = React.useContext(AuthContext);


	React.useEffect(() => {
		getPermissionAsync();
	});

	const getPermissionAsync = async () => {
	    if (Platform.OS == 'ios') {
	    	const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	    	if (status !== 'granted') alert('Please enable camera roll permissions to upload images from your device');
	    }
  	}

  	const _pickImage = async () => {
	    try {
	    	let image = await ImagePicker.launchImageLibraryAsync({
		        mediaTypes: ImagePicker.MediaTypeOptions.Image,
		        allowsEditing: true,
		        aspect: [4, 3],
		        quality: 1
	      	});
	    	if (!image.cancelled) {
	    		setUserData(prevState => {
	    			return {...prevState, 
	    				thumbnail: image.uri,
	    			}
	    		});
	    	}
	    } catch (E) {
	    	console.log(E);
	    }
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding" enabled   keyboardVerticalOffset={100}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Let's get you setup</Text>
			</View>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Upload Profile Picture</Text>
			</View>
			<View style={styles.inputContainer}>
				<Avatar rounded
				showAccessory={true}
		      	title={userData.name ? userData.name[0].toUpperCase() : 'A'}
		      	size={120} 
		      	source={userData.thumbnail ? {uri: userData.thumbnail} : null}
		      	onPress={_pickImage}/>
			</View>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>First Name</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'Ash'} 
				 onChangeText={val => {
				 	const name = val; 
				 	setUserData(prevState => {
				 		return {...prevState, name: name}
				 	});
				 }} 
				 textAlign={'center'} />
			</View>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Age</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'22'} 
				 onChangeText={val => {
				 	const age = val; 
				 	setUserData(prevState => {
				 		return {...prevState, age: age}
				 	});
				 }} 
				 textAlign={'center'} />
			</View>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Email</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} placeholder={'john.smith@playground.ca'} 
				 onChangeText={val => {
				 	const email = val; 
				 	setUserCredentials(prevState => {
				 		return {...prevState, email: email}
				 	});
				 }}
				 keyboardType={'email-address'}
				 autoCapitalize={'none'}
				 textAlign={'center'} />
			</View>
			<View style={styles.subTitleContainer}>
			</View>

			<View style={styles.subTitleContainer}>
				<Text style={styles.subTitleText}>Password</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputText} 
				placeholder={'hunter12'} 
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
			<View style={styles.buttonContainer}>
				 <Button disabled={(userData && userCredentials) ? false : true} title={"Continue"} type={"clear"} 
				 onPress={() => {
				 	props.navigation.navigate('Setup User', {
				 		userData: userData, userCredentials: userCredentials,
				 	 });
				 }}/> 
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		flex: 1,
		width: '100%',
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
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
		paddingVertical: 20
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