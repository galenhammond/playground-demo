import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, ScrollView, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Picker, ActionSheet } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'
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
  const [userMatchRadius, setUserMatchRadius] = React.useState(currentUserDocument.match_radius);
  const [userVisible, setUserVisible] = React.useState(true);
  const [userAgeFilter, setUserAgeFilter] = React.useState(currentUserDocument.age_filter);
  const [userGenderPreference, setUserGenderPreference] = React.useState(currentUserDocument.gender_prefernece);
  const [isSliding, setIsSliding] = React.useState(false); //TODO: Set scrollview to freeze when using slider
  const [isEditing, setEditing] = React.useState(false); //TODO: Setup editable callback to pushes changes to backend and setup logic for determing which button was pressed 

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
    <SafeAreaView style={styles.container}>
      <View style={{
      	justifyContent: 'center',
      	paddingTop: "1%",
      }}>
      	<View style={{
      		borderColor: "#D8D8D8",
      		paddingBottom: "7%",
      		borderBottomWidth: 1,
      		alignItems: "center",
      		justifyContent:"center"}}>
      		<Button title={isEditing ? 'Done' : 'Edit'} type={"clear"} onPress={onEditPress}/>
      		<TouchableOpacity>
		      	<Avatar rounded
		      	showAccessory={true}
		      	title={'A'}
		      	size={120} 
		      	source={currentUserDocument ? {uri: currentUserDocument.thumbnail} : null}
		      	onPress={() => props.navigation.navigate('Upload Photos')} />
		    </TouchableOpacity>

	      	{ isEditing ?  <TextInput style={{fontFamily: "comfortaa-regular", fontSize: 26,
	      	alignSelf: "center",
	      	marginBottom: "2%", 
	      	marginTop: "3.5%", color: SYSTEM_BLUE}}>{currentUser ? currentUser.displayName : null}</TextInput>
	      		: <Text style={{fontFamily: "comfortaa-regular", fontSize: 26,
	      	alignSelf: "center",
	      	marginBottom: "2%", 
	      	marginTop: "3.5%"}}>{currentUser ? currentUser.displayName : null}</Text> }

	      	{ isEditing ? <TextInput onSubmitEditing={() => setEditing(false)} style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", marginBottom: "2%", color: SYSTEM_BLUE}}>{currentUserDocument ? currentUserDocument.age : null}</TextInput>
	      		: <Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", marginBottom: "2%", color: "#757E90"}}>{currentUserDocument ? currentUserDocument.age : null}</Text> }
	      	{ isEditing ? <TextInput onSubmitEditing={() => setEditing(false)} style={{fontFamily: "sfprodisplay-light", fontSize: 16, textAlign: "center", color: SYSTEM_BLUE}}>{currentUserDocument ? currentUserDocument.bio : ''}</TextInput>
	      		: <Text style={{fontFamily: "sfprodisplay-light", fontSize: 16, textAlign: "center", color: "#292929"}}>{currentUserDocument ? currentUserDocument.bio : ''}</Text> }
  			
  			<View style={{
	      		flexDirection: 'row',
	      		flexGrow: 1,
	      		alignItems: "center",
      			justifyContent:"space-even",
      			marginTop: "3.5%",
      			 }}>
      			 { userVisible ?
				<Text style={{paddingRight: 10, color: SYSTEM_GREEN}}>Visible</Text> 
				: <Text style={{paddingRight: 10, color: "#757E90" }}>Visible</Text> 
				}
				<Switch value={userVisible} onValueChange={val => {setUserVisible(val)} }/>
			</View>
      	</View>
      </View>

      <View style={{flex: 1}}>
      	<ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
	      	<View style={styles.containerMessage}>
		        <Text style={{fontSize: 16, color: "#757E90"}}>Match Radius</Text>
	        	<Slider 
	        	value={userMatchRadius/MAX_RADIUS}
	        	step={0.2}
	        	onSlidingComplete={val => setUserMatchRadius(val*MAX_RADIUS)} />
	        	<Text style={{alignSelf: 'center'}}>{userMatchRadius.toFixed(1)} km</Text>
		        <Text style={styles.message}>Set max visibility range</Text>
		    </View>

		    <View style={styles.containerMessage}>
		        <Text style={{fontSize: 16, color: "#757E90"}}>Age Filter</Text>
	        	<Slider 
	        	value={userAgeFilter}
	        	step={AGE_STEP}
	        	onSlidingComplete={val => setUserAgeFilter(val)} />
	        	<Text style={{alignSelf: 'center'}}>{((userAgeFilter / AGE_STEP) + MINIMUM_AGE).toFixed(0)}</Text>
		        <Text style={styles.message}>Set max age range</Text>
		    </View>

		    <View style={styles.containerMessage}>
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
		        <Text style={styles.message}>Set gender preference</Text>
		    </View>
      	</ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
	avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
	},
	message: {
		color: "#757E90",
		fontSize: 12,
		paddingTop: 5
	},
	container: {
		flexGrow: 1,
		backgroundColor: "white"
	}
});
