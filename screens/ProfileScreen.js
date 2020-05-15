import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Picker, ActionSheet } from 'native-base'

const DIMENSION_WIDTH = Dimensions.get("window").width;
const SYSTEM_GREEN = '#30bf54'
const SYSTEM_BLUE = '#007bff'
const MAX_RADIUS = 2.5;
const MAX_AGE = 65;
const AGE_STEP = 0.02173913;
const MINIMUM_AGE = 19;
const GENDER_STEP = 0.5;
const CANCEL_BUTTON_INDEX = 2;
const BUTTONS = ["Add/Replace Photos", "Edit Details", "Cancel"];

export default function ProfileScreen(props) {
  const [userMatchRadius, setUserMatchRadius] = React.useState(MAX_RADIUS);
  const [userVisible, setUserVisible] = React.useState(true);
  const [userAgeFilter, setUserAgeFilter] = React.useState(AGE_STEP * 11);
  const [userGenderPreference, setUserGenderPreference] = React.useState(GENDER_STEP);
  const [isSliding, setIsSliding] = React.useState(false); //TODO: Set scrollview to freeze when using slider
  const [isEditing, setEditing] = React.useState(false); //TODO: Set user fields to be editable on edit button click
 
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
      		<Button title={"Edit"} type={"clear"} onPress={() => ActionSheet.show({
      			options: BUTTONS,
      			destructiveButtonIndex: CANCEL_BUTTON_INDEX
      		}, 
      		buttonIndex => {
      			setEditing(true);
      		}
      		)}/>
      		<TouchableOpacity>
		      	<Avatar rounded
		      	showAccessory={true}
		      	title={props.name[0].toUpperCase()}
		      	size={120} 
		      	source={props.image} />
		    </TouchableOpacity>
	      	{ isEditing ?  <TextInput style={{fontFamily: "comfortaa-regular", fontSize: 26,
	      	alignSelf: "center",
	      	marginBottom: "2%", 
	      	marginTop: "3.5%", color: SYSTEM_BLUE}}>{props.name}</TextInput>
	      		: <Text style={{fontFamily: "comfortaa-regular", fontSize: 26,
	      	alignSelf: "center",
	      	marginBottom: "2%", 
	      	marginTop: "3.5%"}}>{props.name}</Text> }
	      	{ isEditing ? <TextInput onSubmitEditing={() => setEditing(false)} style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", marginBottom: "2%", color: SYSTEM_BLUE}}>{props.age}</TextInput>
	      		: <Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", marginBottom: "2%", color: "#D8D8D8"}}>{props.age}</Text> }
	      	{ isEditing ? <TextInput onSubmitEditing={() => setEditing(false)} style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", color: SYSTEM_BLUE}}>{props.bio}</TextInput>
	      		: props.bio && <Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", color: "#757E90"}}>{props.bio}</Text> }
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
      	<ScrollView style={{flexGrow: 1}}>
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
