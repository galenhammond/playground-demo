import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { Thumbnail } from 'native-base';
import { MatchCounter } from "../components/MatchCounter";
import { AuthContext } from '../navigation/AuthProvider'
import { Data } from '../assets/data/Matches';
import Message from '../components/Messages';
import ChatScreen from '../screens/ChatScreen';
import { DateConversion } from '../utils/EpochTimeConversion'

function MessagesScreen(props) {
  const [searchText, setSearchText] = React.useState();
  const { currentUser, currentUserDocument, userMatches } = React.useContext(AuthContext);

  const userSearch = (query, data) => {

  }

  return (
    <SafeAreaView style={styles.container}>
	  <SearchBar lightTheme round
	  onChangeText={val => setSearchText(val)}
	  value={searchText}
	  placeholder={userMatches.size === 1 ? userMatches.size  + " match..." : userMatches.size +" matches..."} 
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
  	  	<MatchCounter counter={userMatches.size} />
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
  	  	data={[...userMatches]}
  	  	ListEmptyComponent={() => { 
	    	return (
		    	<View style={{padding: 20}}>
		    	</View>
		    );
	    }}
  	  	//TODO: Center elements in list at all times
  	  	/* contentContainerStyle={{
  	  		alignSelf: "center",
  	  		justifyContent: "center",}}
		*/
  	  	renderItem={({ item }) => (
	      <TouchableOpacity style={{padding: 20}} onPress={() => props.navigation.navigate('Chats', {matchDocument: item})}>
	      	<Thumbnail small source={{uri: item.thumbnail}} />
	      </TouchableOpacity>
	      )}
  	  	keyExtractor={(item, index) => index.toString()}
	    />
  	  </View>
	  	<FlatList
	    data={[...userMatches]}
	    keyExtractor={(item, index) => index.toString()}
	    ListEmptyComponent={() => { 
	    	return (
		    	<View>
		    		<Text style={styles.emptyMessageList}>No matches to display</Text>
		    	</View>
		    );
	    }}
	    renderItem={({ item }) => (
	        <Message
	        //TODO: this will be real message data
	          image={item.thumbnail}
	          name={item.name}
	          lastMessage={item.message ? item.message : "Start a conversation with " + item.name + "!"}
	          timeStamp={DateConversion(Date.now()-360000)}
	          matchDocument={item}
	          notification={true}
	          navigation={props.navigation}
	        />
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
	emptyMessageList: {
		paddingVertical: '50%',
		textAlign: 'center',
		fontFamily: 'comfortaa-bold',
		fontSize: 20,
		color: '#D8D8D8'
	}
});
export default MessagesScreen;