import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MatchCard from '../components/MatchCard';

function HomeScreen(props) {
	return (
	  <SafeAreaView style={styles.container}>
	  	<ScrollView contentContainerStyle={{ flexGrow: 1}}>
	  		<MatchCard name={"Michelle"} age={"21"} 
	  		tile={require('../assets/images/Michelle.jpeg')} 
	  		thumbnail={require("../assets/images/MichelleThumb.jpg")} 
	  		distance={"21"} />
	  		<MatchCard name={"Nicole"} age={"21"} 
	  		tile={require('../assets/images/Nicole.jpg')} 
	  		thumbnail={require("../assets/images/ness.jpg")} 
	  		distance={"17"} />
	  	</ScrollView>
	  </SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "white"
	}
});
export default HomeScreen;
