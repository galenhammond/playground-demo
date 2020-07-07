import { Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, ScrollView, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Image, ImageBackground } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Picker, ActionSheet } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'
import styles from '../assets/styles';
//import Slider from '@react-native-community/slider';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const SYSTEM_GREEN = '#30bf54'
const SYSTEM_BLUE = '#add5ff'
const MAX_RADIUS = 2.5;
const MAX_AGE = 50;
const AGE_STEP = 0.032258064516129;
const MINIMUM_AGE = 19;
const GENDER_STEP = 0.5;
const CANCEL_BUTTON_INDEX = 2;
const BUTTONS = ["Add/Replace Photos", "Edit Details", "Cancel"];

export default function ProfileScreen(props) {
  const { currentUser, currentUserDocument } = React.useContext(AuthContext);
  const [isEditing, setEditing] = React.useState(false); //TODO: Setup editable callback to pushes changes to backend and setup logic for determing which button was pressed 
  const [userVisible, setUserVisible] = React.useState(true);
  
  const onEditPress = () => {
  	if (!isEditing) {
	  	ActionSheet.show({
			options: BUTTONS,
			cancelButtonIndex: CANCEL_BUTTON_INDEX
		}, 
		buttonIndex => {
			switch(buttonIndex) {
				case 1:
					setEditing(true);
					break;
			case CANCEL_BUTTON_INDEX:
					setEditing(false);
					break;
				default:
			}
		});
	} else {
		/*Logic to send new edited data to server*/
		setEditing(false);
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
               		{/*	Icon name="optionsV"*/}
              		</Text>
            	</TouchableOpacity>
          	</View>
        </ImageBackground>
	    <View style={styles.containerProfileItem}>
	    	<View style={styles.matchesProfileItem}>
	        	<Text style={styles.matchesTextProfileItem}>
	        		{props.matchProfile ? 'MATCH' :  'Welcome!'}
	        	</Text>
	      	</View>
	      	<View style={{flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent:'center'}}>
	      		<Avatar rounded source={{uri: currentUserDocument.thumbnail}} size={'medium'} avatarStyle={{alignSelf: 'flex-start'}}/>
		      	<View style={{alignSelf: 'center', marginLeft: '-15%', width: '95%', justifyContent:'center'}}> 
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
	        		<Feather name="hash" size={24} color="#757E90" />
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

