import { Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, ScrollView, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Dimensions, TextInput, Image, ImageBackground } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Picker, ActionSheet } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'
import firebaseSDK from '../server/fire'
import styles from '../assets/styles';
import SortableGrid from 'react-native-sortable-grid'
import 'firebase/firestore'

const MAX_IMAGES = 9

export default function UploadPhotoScreen(props) {
	const { currentUser, currentUserDocument, firebase } = React.useContext(AuthContext);
	const [ userImagesToUpload, setUserImagesToUpload ] = React.useState([...currentUserDocument.images]);
	const [ userImagesToRemove, setUserImagesToRemove ] = React.useState([null]);
	const gridRef = React.useRef(null);
	const [ userData, setUserData ] = React.useState({
		bio: currentUserDocument.bio,
		barStatus: currentUserDocument.bar_status,
		interests: currentUserDocument.interests
	});

	const userMadeChanges = (obj) => {
	    for (var key in obj) {
	        if (obj[key] !== null && obj[key] != "")
	            return true;
	    }
	    return false;
	}

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
	    		firebaseSDK.uploadUserImage(currentUser.uid, image.uri).then((imageUrl) => {
		    		console.log(imageUrl);
		    		setUserImagesToUpload(prevState => [...prevState, imageUrl]);
		    	})
    		}
	    } catch (e) {
	    	console.log(e);
	    }
	};

	const _rearrangeImages = (imageArray, itemOrder) => {
		var rearrangedImageArray = []
		for (var i = 0; i < imageArray.length; i++) {
			index = itemOrder.itemOrder[i].key;
			rearrangedImageArray[i] = imageArray[index];
		}
		console.log(rearrangedImageArray);
		return rearrangedImageArray;
	}

	const _removeImage = (imageArray, item) => {
		for (i = 0; i < imageArray.length; i++) {
			index = item.item.key;
			setUserImagesToRemove(prevState => [...prevState, imageArray[index]]);
			imageArray.splice(index, 1);
		}
		return true;
	}

	const onFinishedEditing = () => {
		var removeImages = null;
		const userUpdateData = {
			bio: userData.bio,
			bar_status: userData.barStatus,
			interests: userData.interests,
			images: firebase.firestore.FieldValue.arrayUnion(...userImagesToUpload),
		};
		if (userImagesToRemove) {
			removeImages = {
				images: firebase.firestore.FieldValue.arrayRemove(...userImagesToRemove)
			};
		}

		if (userMadeChanges(userUpdateData) || userImagesToUpload != currentUserDocument.images) firebaseSDK.updateUserDocument(currentUser.uid, userUpdateData);
		if (removeImages) firebaseSDK.updateUserDocument(currentUser.uid, removeImages);
		props.navigation.goBack();
	}

	React.useEffect(() => {
		getPermissionAsync();
	})

	return (
		<KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
			<ScrollView>
				<View style={styles.containerEditProfileItem}>
			    	<View style={styles.matchesEditProfileItem}>
			        	<Text style={styles.matchesTextProfileItem}>Update Images</Text>
			      	</View>
				    <SortableGrid itemsPerRow={3}
				    	ref={gridRef}
				    	blockTransitionDuration={400}
						activeBlockCenteringDuration={200}
						dragActivationTreshold={200}
						onDeleteItem={(item) => _removeImage(userImagesToUpload, item)}
						onDragRelease={itemOrder => setUserImagesToUpload(_rearrangeImages(userImagesToUpload, itemOrder)) }
						onDragStart={() => console.log("Some block is being dragged now!")}>
						{
						    userImagesToUpload.map((image, index) => {
						    	return (
						      		<Image key={index} onTap={() => gridRef.current.toggleDeleteMode()} source={{uri: image}} style={styles.editProfileDragableImage} />
							    )}
						    )
						}
					</SortableGrid>
					<TouchableOpacity style={styles.matchesAddImageItem} onPress={() => _pickImage()}>
				    	<Text style={styles.matchesTextProfileItem}>Add Image</Text>
				    </TouchableOpacity>
			    </View>

				<View style={styles.containerEditProfileItem}>
					<View style={styles.matchesEditProfileItem}>
			        	<Text style={styles.matchesTextProfileItem}>Update Details</Text>
			      	</View>
				    <Text style={styles.name}>{currentUser.displayName}</Text>

				    <Text style={styles.descriptionProfileItem}>
				    	{currentUserDocument.age} - Ottawa{/*currentUserDocument.age*/}
				    </Text>

			      	<View style={styles.info}>
			        	<Text style={styles.iconProfile}>
			        		<Ionicons name="ios-person" size={24} color="#757E90" />
			        	</Text>

			        	<TextInput style={styles.infoContent} onChangeText={val => {
						 	const bio = val; 
						 	setUserData(prevState => {
						 		return {...prevState, bio: bio}
						 	});
						 }}
						 placeholder={'Ready to roll'}
						 >{currentUserDocument.bio ? currentUserDocument.bio : null}</TextInput>
			      	</View>

			      	<View style={styles.info}>
			        	<Text style={styles.iconProfile}>
			        		<Ionicons name="ios-pin" size={24} color="#757E90" />
			        	</Text>
			        	<TextInput style={styles.infoContent} onChangeText={val => {
						 	const barStatus = val; 
						 	setUserData(prevState => {
						 		return {...prevState, barStatus: barStatus}
						 	});
						 }}
						 placeholder={"Barley Mow..."}
						 >{currentUserDocument.bar_status ? currentUserDocument.bar_status : null}</TextInput>
			      	</View>

			      	<View style={styles.info}>
			        	<Text style={styles.iconProfile}>
			        		<Feather name="hash" size={24} color="#757E90" />
			        	</Text>
			        	<TextInput style={styles.infoContent} onChangeText={val => {
						 	const interests = val; 
						 	setUserData(prevState => {
						 		return {...prevState, interests: interests}
						 	});
						 }}
						 placeholder={"Friends, music, and nights out..."}
						 >{currentUserDocument.interests ? currentUserDocument.interests : null}</TextInput>
			      	</View>

			      	<View style={styles.info}>
			        	<Text style={styles.iconProfile}>
			        		<EvilIcons name="calendar" size={24} color="#757E90" />
			        	</Text>
			        	<Text style={styles.infoContent}>Last seen: 24 hours ago</Text>
			      	</View>
			    </View>

			    <View>
				    <TouchableOpacity style={styles.themeButtonItem} onPress={() => onFinishedEditing()}>
				    	<Text style={styles.confirmationButtonText}>Finish Editing</Text>
				    </TouchableOpacity>
			   	</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
	