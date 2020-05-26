import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MatchCard from '../components/MatchCard';
import AdCard from '../components/AdCard';
import {Data} from '../assets/data/demo'

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function HomeScreen(props) {
	//TODO: Refresh must send and receive up to date data from backend

	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
	    setRefreshing(true);
	    //Pull new user info into data variable

	    wait(2000).then(() => setRefreshing(false));
	  }, [refreshing]);

	return (
	  <SafeAreaView style={styles.container}>
	  	<ScrollView showsVerticalScrollIndicator={false}
	  	contentContainerStyle={{ flexGrow: 1}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
      	}>
      		{Data.map(user => {
      			return (
      				<MatchCard {...props} name={user.name}
      				age={user.age}
      				tile={user.images}
      				thumbnail={user.thumbnail}
      				bio={user.bio}
      				distance={user.distance}
      				pinned={user.pinned}
      				/>
      			);
      		})
      		}

	  		<AdCard {...props} name={"Mercedes-Benz Canada"}  
	  		tile={require('../assets/images/mercedes.jpg')} 
	  		thumbnail={require("../assets/images/mercedeslogo.png")}
	  		bio={'AMG Pride. AMG Power. \nLeases starting from $539/month at your local Mercedes-Benz dealer.'} />
	  	</ScrollView>
	  </SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	}
});
export default HomeScreen;