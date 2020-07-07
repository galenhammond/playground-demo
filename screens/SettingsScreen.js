import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, ScrollView, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import { Avatar, Button } from 'react-native-elements'
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Picker, ActionSheet } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'

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

export default function SettingsScreen(props) {
  const { currentUser, currentUserDocument } = React.useContext(AuthContext);
  const [userMatchRadius, setUserMatchRadius] = React.useState(MAX_RADIUS); //currentUserDocument ? currentUserDocument.match_radius : 
  const [userVisible, setUserVisible] = React.useState(true);
  const [userAgeFilter, setUserAgeFilter] = React.useState(currentUserDocument ? currentUserDocument.age_filter : AGE_STEP * 11); //currentUserDocument ? currentUserDocument.age_filter : 
  const [userGenderPreference, setUserGenderPreference] = React.useState(currentUserDocument ? currentUserDocument.gender_preference : GENDER_STEP); //currentUserDocument ? currentUserDocument.gender_preference : 
  const [isSliding, setIsSliding] = React.useState(false); //TODO: Set scrollview to freeze when using slider


	return (
		<View style={{flex: 1, backgroundColor: '#FFFFFF'}}>

			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Settings</Text>
			</View>

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
	);
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
	},
	imageContainer: {
		paddingBottom: '8%'
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
});