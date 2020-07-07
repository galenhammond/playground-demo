import { Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, ScrollView, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Image, ImageBackground } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Picker, ActionSheet } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'
import firebaseSDK from '../server/fire'
import styles from '../assets/styles';
import SortableGrid from 'react-native-sortable-grid'

const MAX_IMAGES = 9

export default function UploadPhotoScreen(props) {
	const { currentUser, currentUserDocument } = React.useContext(AuthContext);
	const [ userData, setUserData ] = React.useState({
		bio: currentUserDocument.bio,
		barStatus: currentUserDocument.barStatus,
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
	    		setImages(prevState => [...prevState, image.uri]);
    		}
	    } catch (e) {
	    	console.log(e);
	    }
	};

	const onFinishedEditing = () => {
		const userUpdateData = {
			bio: userData.bio,
			bar_status: userData.barStatus,
			interests: userData.interests
		};
		if (userMadeChanges(userUpdateData)) firebaseSDK.updateUserDocument(currentUser.uid, userUpdateData);
		props.navigation.goBack();
	}

	React.useEffect(() => {
		getPermissionAsync();
	})

	return (
		<SafeAreaView>
			<View style={styles.containerEditProfileItem}>
		    	<View style={styles.matchesEditProfileItem}>
		        	<Text style={styles.matchesTextProfileItem}>Update Images</Text>
		      	</View>
			    <SortableGrid itemsPerRow={3} style={{justifyContent: 'center', alignItems: 'center'}}
			    	blockTransitionDuration={400}
					activeBlockCenteringDuration={200}
					dragActivationTreshold={200}
					onDragRelease={itemOrder => console.log("Drag was released, the blocks are in the following order: ", itemOrder) }
					onDragStart={() => console.log("Some block is being dragged now!")}>
					{
					    currentUserDocument.images.map((image, index) => {
					    	return (
					      		<Image key={index} source={{uri: image}} style={styles.editProfileDragableImage} />
						    )}
					    )
					}
				</SortableGrid>
				<TouchableOpacity style={styles.matchesAddImageItem} onPress={() => onFinishedEditing()}>
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
		        	<Text style={styles.infoContent}>Last seen: 24 hrs ago</Text>
		      	</View>
		    </View>

		    <View>
			    <TouchableOpacity style={styles.themeButtonItem} onPress={() => onFinishedEditing()}>
			    	<Text style={styles.matchesTextProfileItem}>Finish Editing</Text>
			    </TouchableOpacity>
		   	</View>
		</SafeAreaView>
	);
}
	