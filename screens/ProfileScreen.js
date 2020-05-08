import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements'


export default function ProfileScreen(props) {
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
	      	<Avatar rounded
	      	title={props.name[0]}
	      	size={120} 
	      	source={props.image}
	      	showAccessory={true} />
	      	<Text style={{fontFamily: "comfortaa-regular", fontSize: 26,
	      	alignSelf: "center",
	      	marginBottom: "2%", 
	      	marginTop: "3.5%"}}>{props.name}</Text>
	      	<Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", marginBottom: "2%", color: "#F8D8D8"}}>{props.age}</Text>
	      	<Text style={{fontFamily: "sfprodisplay-regular", fontSize: 16, textAlign: "center", color: "#757E90"}}>Here for a good time, not a long time!</Text>
      	</View>
      </View>
      <View>
      	<ScrollView>

      	</ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "white"
	}
});
