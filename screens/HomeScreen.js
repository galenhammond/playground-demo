import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MatchCard from '../components/MatchCard';
import AdCard from '../components/AdCard';

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
	  	<ScrollView showsVerticalScrollIndicator={false}
	  	contentContainerStyle={{ flexGrow: 1}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
      	}>
	  		<MatchCard {...props}
	  		name={"Madison"} age={"21"} 
	  		tile={require('../assets/images/Michelle.jpeg')} 
	  		thumbnail={require("../assets/images/MichelleThumb.jpg")} 
	  		distance={"21"}
	  		bio={'Looking at my phone searching for a reason to stop looking at my phone lol'} 
	  		pinned/>
	  		<MatchCard {...props}
	  		name={"Nicole"} age={"19"} 
	  		tile={require('../assets/images/ness.jpg')} 
	  		thumbnail={require("../assets/images/Nicole.jpg")} 
	  		distance={"17"}
	  		bio={'Travelling from Calabria, Italy 🌎 \nLooking for a night out with a new friend'} />
	  		<AdCard {...props} name={"Mercedes-Benz Canada"}  
	  		tile={require('../assets/images/mercedes.jpg')} 
	  		thumbnail={require("../assets/images/mercedeslogo.png")}
	  		bio={'AMG Pride. AMG Power. \nLeases starting from $539/month at your local Mercedes-Benz dealer.'} />
	  		<MatchCard {...props}
	  		name={"Kate"} age={"20"} 
	  		tile={require('../assets/images/Kate.jpg')} 
	  		thumbnail={require("../assets/images/KateThumb.jpg")} 
	  		distance={"42"}
	  		bio={'ig/snap: @galenhammond17'} />
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