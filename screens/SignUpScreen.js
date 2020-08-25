import * as React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Text, StyleSheet, Platform, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { AuthContext } from '../navigation/AuthProvider';
import styles from '../assets/styles';
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
		<SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
			<KeyboardAvoidingView style={_styles.container} behavior="padding" enabled keyboardVerticalOffset={110}>
				<ScrollView>
					<View style={_styles.titleContainer}>
						<Text style={_styles.titleText}>Let's get you setup</Text>
					</View>

					<View style={styles.containerEditProfileItem}>
				      	<View style={_styles.inputContainer}>
							<Avatar rounded
							showAccessory={true}
					      	title={userData.name ? userData.name[0].toUpperCase() : 'A'}
					      	size={120} 
					      	source={userData.thumbnail ? {uri: userData.thumbnail} : null}
					      	onPress={_pickImage}/>
						</View>
						<TouchableOpacity style={styles.matchesAddImageItem} onPress={() => _pickImage()}>
					    	<Text style={styles.matchesTextProfileItem}>Add Profile Photo</Text>
					    </TouchableOpacity>
				    </View>

				    <View style={styles.containerEditProfileItem}>
						<View style={styles.matchesEditProfileItem}>
				        	<Text style={styles.matchesTextProfileItem}>Your Details</Text>
				      	</View>

						<Text style={_styles.subTitleText}>First Name</Text>
						<TextInput style={_styles.inputText} placeholder={'Ash'} 
						 onChangeText={val => {
						 	const name = val; 
						 	setUserData(prevState => {
						 		return {...prevState, name: name}
						 	});
						 }} 
						 textAlign={'center'} />

						<Text style={_styles.subTitleText}>Age</Text>
						<TextInput style={_styles.inputText} placeholder={'22'} 
						 onChangeText={val => {
						 	const age = val; 
						 	setUserData(prevState => {
						 		return {...prevState, age: age}
						 	});
						 }} 
						 textAlign={'center'} />

						<Text style={_styles.subTitleText}>Email</Text>
						<TextInput style={_styles.inputText} placeholder={'john.smith@playground.ca'} 
						 onChangeText={val => {
						 	const email = val; 
						 	setUserCredentials(prevState => {
						 		return {...prevState, email: email}
						 	});
						 }}
						 keyboardType={'email-address'}
						 autoCapitalize={'none'}
						 textAlign={'center'} />

						<Text style={_styles.subTitleText}>Password</Text>
						<TextInput style={_styles.inputText} 
						placeholder={'******'} 
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
					<TouchableOpacity style={styles.themeButtonItem} onPress={() => {
					 	props.navigation.navigate('Setup User', {
					 		userData: userData, userCredentials: userCredentials,
					 	 });
					 }}> 
				    	<Text style={styles.confirmationButtonText}>Continue</Text>
				    </TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const _styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF'
	}, 
	titleContainer: {
		paddingBottom: 20,
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
		textAlign: 'center',
		paddingVertical: 20
	},
	inputContainer: {
		width: '100%',
		alignItems: 'center',
		paddingVertical: 20
	},
	inputText: {
		alignSelf: 'center',
		fontFamily: "sfprodisplay-light",
		color: '#757E90',
		borderBottomWidth: 0.3,
		borderRadius: 20,
		borderColor: '#D8D8D8',
		fontSize: 21,
		width: '90%'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	}
})