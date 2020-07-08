import { Ionicons, EvilIcons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, ScrollView, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Image, ImageBackground } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Picker, ActionSheet } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'
import styles from '../assets/styles';
import firebaseSDK from '../server/fire'
//import Slider from '@react-native-community/slider';

export default function ProfileScreen(props) {
  const { currentUser, currentUserDocument } = React.useContext(AuthContext);
  
  const _pickImage = async () => {
	    try {
	    	let image = await ImagePicker.launchImageLibraryAsync({
		        mediaTypes: ImagePicker.MediaTypeOptions.Image,
		        allowsEditing: true,
		        aspect: [4, 3],
		        quality: 1
	      	});
	    	if (!image.cancelled) {
	    		firebaseSDK.uploadUserImage(currentUser.uid, image.uri).then(imageUrl => {
	    			firebaseSDK.updateUserDocument(currentUser.uid, {thumbnail: imageUrl});
	    		});
    		}
	    } catch (e) {
	    	console.log(e);
	    }
    };

  const getPermissionAsync = async () => {
	    if (Platform.OS == 'ios') {
	    	const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	    	if (status !== 'granted') alert('Please enable camera roll permissions to upload images from your device');
	    }
  	}



  return (
  	 <View
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
      	<ImageBackground source={{uri: currentUserDocument.thumbnail}} style={styles.photo}>
        	<View style={styles.top}>
        		<TouchableOpacity>
              		<Text style={styles.topIconLeft}>
                		{/*Icon name="chevronLeft"*/}
              		</Text>
            	</TouchableOpacity>
            	<TouchableOpacity>
              		<Text style={styles.topIconRight}>
               			<Ionicons name={'ios-more'} size={24} color={'#D8D8D8'} />
              		</Text>
            	</TouchableOpacity>
          	</View>
        </ImageBackground>
	    <View style={styles.containerProfileItem}>
	    	<View style={styles.matchesProfileItem}>
	        	<Text style={styles.matchesTextProfileItem}>
	        		{props.matchProfile ? 'Matched' :  'Welcome!'}
	        	</Text>
	      	</View>
	      	<View style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent:'center'}}>

	      		<TouchableOpacity onPress={() => ActionSheet.show({
		              options: [' Change Profile Picture', 'Cancel'],
		              cancelButtonIndex: 1,
            		},
            		buttonIndex => {
		              switch(buttonIndex) {
		                case 0:
		                	_pickImage();
		                	break;
		                default:
		                //do nothing
		              }
		            })
	      		}>
		      		<Image source={{uri: currentUserDocument.thumbnail}} 
		      		style={{alignSelf: 'flex-start', borderRadius: 30, width: 50, height: 50, marginVertical: 15}}  />
		      	</TouchableOpacity>

		      	<View style={{alignSelf: 'center', marginLeft: '-15%', width: '94%', justifyContent:'center'}}> 
				    <Text style={styles.name}>{currentUser.displayName}</Text>

				    <Text style={styles.descriptionProfileItem}>
				    	{currentUserDocument.age} - Ottawa{/*currentUserDocument.age*/}
				    </Text>
				</View>
			</View>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        		<Ionicons name="ios-person" size={24} color="#757E90" />
	        	</Text>
	        	<Text style={styles.infoContent}>{currentUserDocument.bio ? currentUserDocument.bio : null}</Text>
	      	</View>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        		<Ionicons name="ios-pin" size={24} color="#757E90" />
	        	</Text>
	        	<Text style={styles.infoContent}>{currentUserDocument.bar_status ? currentUserDocument.bar_status : null}</Text>
	      	</View>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        		<Feather name="hash" size={24} color="#757E90"/>
	        	</Text>
	        	<Text style={styles.infoContent}>{currentUserDocument.interests ? currentUserDocument.interests : null}</Text>
	      	</View>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        		<EvilIcons name="calendar" size={24} color="#757E90" />
	        	</Text>
	        	<Text style={styles.infoContent}>Last seen: 24 hours ago</Text>
	      	</View>
	    </View>
	    <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Text style={styles.iconButton}>
              <EvilIcons name="share-apple" size={24} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton} onPress={props.matchProfile ? null : () => props.navigation.navigate("Edit Profile")}>
            <Text style={styles.iconButton}>
              {/*<Icon name="chat" />*/}
            </Text>
            <Text style={styles.textButton}>{props.matchProfile ? 'Start chatting' : 'Edit Profile'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 50}}>
	    {currentUserDocument.images.map((image, id) => {
			return (
				<Image source={{uri: image}} key={id} style={styles.photo, {width: null, height: 500} }/>
			);
	        })
    	}
    	</View>
      </ScrollView>
    </View>
  );
};

