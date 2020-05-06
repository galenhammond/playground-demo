import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends React.Component {
	static navigationOptions = () => {
	        return {
	            headerLeft: <HamburgerIcon/>
	        };
	    };
	render() {
	return (
	  <SafeAreaView>
	    <Text>HomeScreen</Text>
	  </SafeAreaView>
	);
	}
}
export default HomeScreen;
