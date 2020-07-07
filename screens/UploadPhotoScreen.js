import * as React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, StyleSheet, Platform, Image, TouchableOpacity, FlatList, ScrollView, Slider } from 'react-native';
import { Avatar } from 'react-native-elements';
import MatchCard from '../components/MatchCard';
import { Entypo, MaterialCommunityIcons, AntDesign  } from '@expo/vector-icons'; 
import * as Permissions from 'expo-permissions';
import { AuthContext } from '../navigation/AuthProvider';
import firebaseSDK from '../server/fire'
import ImagePicker from 'expo-image-picker';
import { DeckSwiper, Button, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, Toast, ActionSheet } from 'native-base';
import Swiper from 'react-native-swiper'


export default function UploadPhotoScreen(props) {
	const { currentUser, currentUserDocument } = React.useContext(AuthContext);
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

	React.useEffect(() => {
		getPermissionAsync();
	})

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Card>
			    	<CardItem>
			  	    	<Left>
			  	       <Thumbnail source={currentUserDocument && {uri: currentUserDocument.thumbnail}} />
			     	 		<Body>
				          		<Text style={styles.headerText}>{currentUser.displayName}</Text>
				          		<Text note>{currentUserDocument.age}</Text>
			        		</Body>
			        	</Left>
			          <Right>
			          </Right>
			      	</CardItem>
			  		<CardItem cardBody>
			          <Swiper showsPagination={false} loop={false} bounces={true} height={350}>
			            {currentUserDocument && currentUserDocument.images.map((image, i) => {
			              return (
			                <Image key={i} source={{uri: image}} style={{height: 350, width: null, flex: 1}} />
			                );
			              })
			            }
			          </Swiper>
			        </CardItem>
			        {/* textColor: #828181*/}
			        <TextInput 
			        placeholder={currentUserDocument.bio} 
			        onChangeText={val => {
					 	const bio = val; 
					 	setUserData(prevState => {
					 		return {...prevState, bio: bio}
					 	});
					 }} 
					 textAlign={'left'}
					 style={{fontSize: 16, fontFamily: "sfprodisplay-light", color: "#292929", paddingHorizontal: "3%", paddingTop: "4%"}}></TextInput>
			        {/*<Text style={{color: "#D8D8D8", paddingHorizontal: "3%", paddingTop: "2%", fontFamily: "sfprodisplay-light", fontSize: 14}}>43:26</Text>*/}
			        <CardItem>
			        	<Left>
			          	<Button transparent>
			          		<Icon active name="wine" />
			            		<Text style={styles.footerText}>buy a drink</Text>
			          	</Button>
			        	</Left>
			          	<Body>
			            	<Button transparent>
			            		<Icon active name="chatbubbles" />
			              	  <Text style={styles.footerText}>message</Text>
			            	</Button>
			          	</Body>
			        	<Right>
			          	<Text style={{fontSize: 13}}>23m away</Text>
			        	</Right>
			        </CardItem>
		   		</Card>
		   		<View style={{flexGrow: 1}}>
		   			<View style={styles.containerMessage}>
		   				<Button style={{alignSelf: 'center'}} transparent onPress={() => _pickImage()}>
				        	<Text style={{fontSize: 16}}>{currentUserDocument.images.length ? 'Upload Another Image' : 'Upload Image'}</Text>
				        </Button>
		   				<Button style={{alignSelf: 'center'}} transparent onPress={null}>
				        	<Text style={{fontSize: 16}}>Finish Editing</Text>
				        </Button>
				    </View>
				</View>
			</ScrollView>
		</View>
	);
}
	
const styles = StyleSheet.create({
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
		paddingTop: '10%',
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
		paddingBottom: 20
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