import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { SearchBar, Button } from 'react-native-elements';
import { Thumbnail } from 'native-base';
import { MatchCounter } from "../components/MatchCounter";
import { Data } from '../assets/data/demo.js';
import Message from '../components/Messages';
import ChatScreen from '../screens/ChatScreen';

//TODO: Implement pull down to refresh

export default function MessagesScreen(props) {
  const [searchText, setSearchText] = React.useState();

  return (
    <SafeAreaView style={styles.container}>
	  <SearchBar lightTheme round
	  onChangeText={val => setSearchText(val)}
	  value={searchText}
	  placeholder="17 matches..." //Source this from props/redux store
	  containerStyle={{
	  	backgroundColor: 'white',
	  	borderBottomWidth: 0,
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
	  	fontSize: 16
	  }}
	  //TODO: create event handler in app.js
	  //onChange={props.onChange}
	    />
  	  <View>
  	  	<MatchCounter counter="12" timer="9:22"/>
  	  </View>
  	  <View style={{flexDirection: "row",
  	  alignSelf: 'center',
  	  justifyContent: 'center', 
  	  borderBottomWidth: 0.7,   
  	  borderColor: "#D8D8D8"}}>
  	  	<FlatList
  	  	contentContainerStyle={{
  	  		justifyContent: 'center',
  	  		paddingLeft: "1%",
  	  		paddingRight: "1%"

  	  	}}
  	  	horizontal
  	  	data={Data}
  	  	//TODO: Center elements in list at all times
  	  	/* contentContainerStyle={{
  	  		alignSelf: "center",
  	  		justifyContent: "center",}}
		*/
  	  	renderItem={({ item }) => (
	      <TouchableOpacity style={{padding: 20}}>
	      	<Thumbnail small source={item.image} />
	      </TouchableOpacity>
	      )}
  	  	keyExtractor={(item, index) => index.toString()}
	    />
  	  </View>
	  	<FlatList
	    data={Data}
	    keyExtractor={(item, index) => index.toString()}
	    renderItem={({ item }) => (
	      <TouchableOpacity onPress={() => props.navigation.navigate('chats')} >
	        <Message
	          image={item.image}
	          name={item.name}
	          lastMessage={item.message}
	          timeStamp={item.timestamp}
	          opened
	        />
	      </TouchableOpacity>
	    )}
	  />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1
	},
});