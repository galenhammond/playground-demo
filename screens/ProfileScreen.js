import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Slider, Switch, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import { VisibilitySwitch } from '../components/VisibilitySwitch'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const DIMENSION_WIDTH = Dimensions.get("window").width;
const SYSTEM_GREEN = '#30bf54'
const MAX_RADIUS = 2.5;
const MAX_AGE = 65;
const AGE_STEP = 0.02173913;
const MINIMUM_AGE = 19;
const GENDER_STEP = 0.5;

export default function ProfileScreen(props) {
  const [userMatchRadius, setUserMatchRadius] = React.useState(1*MAX_RADIUS);
  const [userVisible, setUserVisible] = React.useState(true);
  const [userAgeFilter, setUserAgeFilter] = React.useState(AGE_STEP * 11);
  const [userGenderFilter, setUserGenderFilter] = React.useState(GENDER_STEP);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
      	justifyContent: 'center',
      	paddingTop: "10%",
      }}>
      	<View style={{
      		borderColor: "#D8D8D8",
      		paddingBottom: "7%",
      		borderBottomWidth: 1,
      		alignItems: "center",
      		justifyContent:"center"}}>
      		<TouchableOpacity>
		      	<Avatar rounded
		      	showAccessory={true}
		      	title={props.name[0].toUpperCase()}
		      	size={120} 
		      	source={props.image} />
		    </TouchableOpacity>
	      	<Text style={{fontFamily: "comfortaa-regular", fontSize: 26,
	      	alignSelf: "center",
	      	marginBottom: "2%", 
	      	marginTop: "3.5%"}}>{props.name}</Text>
	      	<Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", marginBottom: "2%", color: "#D8D8D8"}}>{props.age}</Text>
	      	{props.bio ? 
	      		<Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", color: "#757E90"}}>{props.bio}</Text>
	      		: <View />
	      	}
  			<View  style={{
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
		        <Text style={{fontSize: 16, color: "#757E90"}}>Gender Filter</Text>
	        	<Slider 
	        	value={userGenderFilter}
	        	step={GENDER_STEP}
	        	onSlidingComplete={val => setUserGenderFilter(val)} />
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
	// COMPONENT - MESSAGE
	containerMessage: {
		flexGrow: 1,
		alignItems: "stretch",
		justifyContent: "center",
		flexDirection: "column",
		paddingHorizontal: 20,
		paddingBottom: "5%"
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
