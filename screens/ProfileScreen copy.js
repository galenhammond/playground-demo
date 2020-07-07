import { Ionicons } from '@expo/vector-icons';
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
const SYSTEM_BLUE = '#007bff'
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
	        	</Text>
	      	</View>

		    <Text style={styles.name}>{currentUser.displayName}</Text>

		    <Text style={styles.descriptionProfileItem}>
		    	{currentUserDocument.age} - {currentUserDocument.age}
		    </Text>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        	</Text>
	        	<Text style={styles.infoContent}>{currentUserDocument.bio}</Text>
	      	</View>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        	</Text>
	        	<Text style={styles.infoContent}>TODO</Text>
	      	</View>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        	</Text>
	        	<Text style={styles.infoContent}>TODO</Text>
	      	</View>

	      	<View style={styles.info}>
	        	<Text style={styles.iconProfile}>
	        	</Text>
	        	<Text style={styles.infoContent}>TODO</Text>
	      	</View>
	    </View>
	    <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Text style={styles.iconButton}>
              {/*Icon name="optionsH"*/}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              {/*<Icon name="chat" />*/}
            </Text>
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View>
        <View>
        {currentUserDocument.images.map(image => {
        	<Image source={{uri: image}} style={{width: null, height: 500}} />
        })
    	}
    	</View>
      </ScrollView>
    </View>
  );
};

