import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements'
import { MatchCounter } from "../components/MatchCounter";

export default function MessagesScreen(props) {
  const [searchState, setSearchState] = React.useState();
  return (
    <SafeAreaView style={styles.container}>
	  <SearchBar lightTheme round
	  searchIcon="false"
	  placeholder="17 matches..." 
	  containerStyle={{
	  	backgroundColor: 'white',
	  	borderTopWidth: 0,
	  	height: "7.65%"
	  }}
	  inputContainerStyle={{
	  	backgroundColor: "white",
	  	alignSelf: "center",
	  	borderBottomWidth: 0.5,
	  	borderTopWidth: 0.5,
	  	borderRightWidth: 0.5,
	  	borderLeftWidth: 0.5,
	  	borderColor: "#D8D8D8",
	  	height: "25%",
	  	width: "95%"
	  }}
	  inputStyle={{
	  	fontFamily: "sfprodisplay-light",
	  	fontSize: "16%"
	  }}
	  //TODO: create event handler in app.js
	  //onChange={props.onChange}
	    />
  	  <View>
  	  	<MatchCounter counter="12" timer="9:22"/>
  	  </View>
  	  <View>
  	  </View>
  	  <ScrollView>
  	  </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1
	}
})