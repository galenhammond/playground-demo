import * as React from 'react';
import { Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, StyleSheet, Platform, Image, TouchableOpacity, FlatList, ScrollView, Slider } from 'react-native';
import { Avatar } from 'react-native-elements';
import MatchCard from '../components/MatchCard';
import { Entypo, MaterialCommunityIcons, AntDesign  } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { AuthContext } from '../navigation/AuthProvider';
import firebaseSDK from '../server/fire'
import { DeckSwiper, Button, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, Toast, ActionSheet } from 'native-base';
import Swiper from 'react-native-swiper'
import * as Location from 'expo-location'
import styles from '../assets/styles';
import SortableGrid from 'react-native-sortable-grid'

const SYSTEM_GREEN = '#30bf54'
const SYSTEM_BLUE = '#007bff'
const MAX_RADIUS = 2.5;
const MAX_AGE = 50;
const AGE_STEP = 0.032258064516129;
const MINIMUM_AGE = 19;
const GENDER_STEP = 0.5;

export default function SetupUserCardScreen(props) {
	const [userCredentials, setUserCredentials] = React.useState(props.route.params.userCredentials);
	const [userData, setUserData] = React.useState(props.route.params.userData);
	const [images, setImages] = React.useState([]);
	const gridRef = React.useRef(null);
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
	const [userMatchRadius, setUserMatchRadius] = React.useState(MAX_RADIUS);
	const [userAgeFilter, setUserAgeFilter] = React.useState(AGE_STEP * 11);
	const [userGenderPreference, setUserGenderPreference] = React.useState(GENDER_STEP);
	const { register } = React.useContext(AuthContext);

	React.useEffect(() => {
		getPermissionAsync();
		/*const location = Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
		setUserData(prevState => {
			return {
				...prevState,
				location: {
					longitude: location.coords.longitude,
					latitude: location.coords.latitude
				}
			}
		})*/
	});

	const getPermissionAsync = async () => {
	    if (Platform.OS == 'ios') {
	    	const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	    	if ( status !== 'granted') alert('Please enable camera roll permissions to upload images from your device');
	    	/*let { locationStatus } = await Location.requestPermissionsAsync(Permissions.LOCATION);
	        if (locationStatus !== 'granted') {
		        /*setErrorMsg('Permission to access location was denied');
     		}*/
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

	const _onRegister = (user) => {
		register(user, 
			/*onSuccess callback*/
			async (createdUser) => {
				let promises = []
				promises.push(firebaseSDK.uploadUserImage(createdUser.user.uid, userData.thumbnail));
				images.forEach(async (image) => {
					promises.push(firebaseSDK.uploadUserImage(createdUser.user.uid, image));
				});
				Promise.all(promises).then( async function(createdUser, userData, tasks) {
					console.log(tasks);
					const data = {
						name: userData.name,
						age: userData.age,
						bio: userData.bio,
						bar_status: userData.barStatus,
						interests: userData.interests,
						thumbnail: tasks[0],
						images: tasks.slice(1),
						visible: true,
						powerups: {
							buy_a_drink: {
								remaining: 1,
								timestamp: null
							},
							pin: {
								remaining: 3,
								timestamp: null
							},
							boost: {
								remaining: 1,
								timestamp: null
							},
							rewind: {
								remaining: 0,
								timestamp: null
							}
						},
						match_radius: userMatchRadius,
						gender_preference: userGenderPreference,
						age_filter: userAgeFilter
						//location: firebaseSDK.getGeopoint(userData.location.longitude, userData.location.latitude)
					};
					firebaseSDK.updateUserAuthProfile({
						displayName: userData.name,
						//photoUrl: thumbnailUri
					}, () => console.log('Created authenticated user'), () => console.log("Could not create user authentication"));
					//FIX SET DATA CALL
					console.log(data);
					firebaseSDK.createUserDocument(createdUser.user.uid, data);
					await props.storePersistenceToken();
					console.log("CREATED USER"); 
				}.bind(null, createdUser, userData));
			}, e => console.log(e)
		);
	}

	return (
		<SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
			<KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
				<ScrollView showsVerticalScrollIndicator={false}>

					<View style={_styles.titleContainer}>
						<Text style={_styles.titleText}>Customize your profile</Text>
					</View>

					<View style={styles.containerEditProfileItem}>
					    <SortableGrid itemsPerRow={3}
					    	ref={gridRef}
					    	blockTransitionDuration={400}
							activeBlockCenteringDuration={200}
							dragActivationTreshold={200}
							onDeleteItem={(item) => _removeImage(userImagesToUpload, item)}
							onDragRelease={itemOrder => setUserImagesToUpload(_rearrangeImages(userImagesToUpload, itemOrder)) }
							onDragStart={() => console.log("Some block is being dragged now!")}>
							{
							    images.map((image, index) => {
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

				    {/*TODO: ADD PROFILE IMAGE AS IT IS ON NORMAL PROFILE*/}
				    <View style={styles.containerEditProfileItem}>
						<View style={styles.matchesEditProfileItem}>
				        	<Text style={styles.matchesTextProfileItem}>Profile</Text>
				      	</View>
					    <Text style={styles.name}>{userData.name}</Text>

					    <Text style={styles.descriptionProfileItem}>
					    	{userData.age} - Ottawa{/*currentUserDocument.age*/}
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
							 >{userData.bio ? userData.bio : null}</TextInput>
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
							 >{userData.bar_status ? userData.bar_status : null}</TextInput>
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
							 >{userData.interests ? userData.interests : null}</TextInput>
				      	</View>
				    </View>

			   		<View style={{flexGrow: 1, backgroundColor: '#FFFFFF'}}>

				      	<View style={_styles.containerMessage}>
					        <Text style={{fontSize: 16, color: "#757E90"}}>Match Radius</Text>
				        	<Slider 
				        	value={userMatchRadius/MAX_RADIUS}
				        	step={0.2}
				        	onSlidingComplete={val => setUserMatchRadius(val*MAX_RADIUS)} />
				        	<Text style={{alignSelf: 'center'}}>{userMatchRadius.toFixed(1)} km</Text>
					        <Text style={_styles.message}>Set max visibility range</Text>
					    </View>

					    <View style={_styles.containerMessage}>
					        <Text style={{fontSize: 16, color: "#757E90"}}>Age Filter</Text>
				        	<Slider 
				        	value={userAgeFilter}
				        	step={AGE_STEP}
				        	onSlidingComplete={val => setUserAgeFilter(val)} />
				        	<Text style={{alignSelf: 'center'}}>{((userAgeFilter / AGE_STEP) + MINIMUM_AGE).toFixed(0)}</Text>
					        <Text style={_styles.message}>Set max age range</Text>
					    </View>

					    <View style={_styles.containerMessage}>
					        <Text style={{fontSize: 16, color: "#757E90"}}>Gender Preference</Text>
				        	<Slider 
				        	value={userGenderPreference}
				        	step={GENDER_STEP}
				        	onSlidingComplete={val => setUserGenderPreference(val)} />
				        	<View style={{flex: 1, 
				        		flexDirection: "row",
				        		alignItems: 'center',
				        		justifyContent: 'space-between', }}>
					        	<MaterialCommunityIcons name="human-male" size={24} color="#757E90" />
					        	<MaterialCommunityIcons name="human-male-female" size={24} color="#757E90" />
					        	<MaterialCommunityIcons name="human-female" size={24} color="#757E90" />
					        </View>
					        <Text style={_styles.message}>Set gender preference</Text>
					    </View>
					</View>
					<View style={_styles.buttonContainer}>
					    <TouchableOpacity style={styles.themeButtonItem} onPress={() => _onRegister(userCredentials)}>
					    	<Text style={styles.confirmationButtonText}>Finish Sign Up</Text>
					    </TouchableOpacity>
				   	</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const _styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#FFFFFF',
		justifyContent: 'space-between'
	}, 
	titleContainer: {
		alignItems: 'center',
	},
	titleText: {
		paddingTop: '15%',
		paddingBottom: '10%',
		textAlign: 'center',
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
		paddingTop: 20
	},
	headerText: {
		fontFamily: 'sfprodisplay-regular',
	},
	lowerText: {
		fontFamily: "comfortaa-regular"
	},
	containerMessage: {
		flexGrow: 1,
		alignItems: "stretch",
		justifyContent: "center",
		flexDirection: "column",
		paddingHorizontal: 20,
		paddingVertical: "3%",
		borderBottomWidth: 0.5,
		borderColor: "#D8D8D8"
	},
	message: {
		color: "#757E90",
		fontSize: 12,
		paddingTop: 5
	},
})