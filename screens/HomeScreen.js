import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MatchCard from '../components/MatchCard';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function HomeScreen(props) {
	//TODO: Inject MatchCards as a callback rather than hard coding them
	//TODO: Refresh must send and receive up to date data from backend

	const [refreshing, setRefreshing] = React.useState(false);
	 const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

	return (
	  <SafeAreaView style={styles.container}>
	  	<ScrollView contentContainerStyle={{ flexGrow: 1}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
          >
	  		<MatchCard {...props}
	  		name={"Madison"} age={"21"} 
	  		tile={require('../assets/images/Michelle.jpeg')} 
	  		thumbnail={require("../assets/images/MichelleThumb.jpg")} 
	  		distance={"21"}
	  		bio="Here for a good time, not a long time!" />
	  		<MatchCard {...props}
	  		name={"Nicole"} age={"19"} 
	  		tile={require('../assets/images/Nicole.jpg')} 
	  		thumbnail={require("../assets/images/ness.jpg")} 
	  		distance={"17"}
	  		bio="Only on here for the night!" />
	  		<MatchCard {...props}
	  		name={"Kate"} age={"20"} 
	  		tile={require('../assets/images/Kate.jpg')} 
	  		thumbnail={require("../assets/images/KateThumb.jpg")} 
	  		distance={"42"}
	  		bio="CSS is my one true love" />
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
