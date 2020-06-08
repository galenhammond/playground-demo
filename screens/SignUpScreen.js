import * as React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Text, StyleSheet, Platform, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function SignUpScreen(props) {
	const [userCredentials, setUserCredentials] = React.useState({email: '', password: ''});
	const [userFirstName, setUserFirstName] = React.useState();
	const [userAge, setUserAge] = React.useState();
	const [userEmail, setUserEmail] = React.useState();
	const [userPictures, setUserPictures] = React.useState([]);
	const [userPicturesUploaded, setUserPicturesUploaded] = React.useState(false);
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

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
	    	let result = await ImagePicker.launchImageLibraryAsync({
		        mediaTypes: ImagePicker.MediaTypeOptions.Image,
		        allowsEditing: true,
		        aspect: [4, 3],
		        quality: 1
	      	});
	    	if (!result.cancelled) {
	    		setUserPictures(prevState => [...prevState, result]);
	    		setUserPicturesUploaded(true);
	    		console.log(userPictures);
	    		console.log(result);
	    	}
	    	//console.log(result);
	    } catch (E) {
	    	console.log(E);
	    }
	};

	const _onRegister = (user) => {
		console.log(userCredentials);
		/*OAuth verification logic*/
		firebaseSDK.registerUser(user, 
			/*onSuccess callback*/
			() => {
				props.navigation.navigate("Playground");
			}, e => console.log(e)
		)
	}

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
				<TextInput style={styles.inputText} placeholder={'hunter12'} 
				 onChangeText={val => {
				 	const password = val; 
				 	setUserCredentials(prevState => {
				 		return {...prevState, password: password}
				 	});
				 }}
				 textAlign={'center'}
				 autoCapitalize={'none'} />
			</View>
			<View style={styles.subTitleContainer}>
			</View>

			<View style={styles.inputContainer}>
				<Button title={userPicturesUploaded ? "Upload Another Picture" : "Upload Picture"} type={"clear"} onPress={_pickImage}/>
			</View>
			{userPictures.map(picture => {
				<View>
					<Image source={{uri: picture.uri}} style={{height: 52.5, width: 70, flex: 1}} />
				</View>
				})
			}
			<View style={styles.buttonContainer}>
				 <Button disabled={false} title={"Sign Up"} type={"clear"} onPress={() => _onRegister(userCredentials)}/> 
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