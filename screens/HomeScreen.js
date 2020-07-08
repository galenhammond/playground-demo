import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MatchCard from '../components/MatchCard';
import AdCard from '../components/AdCard';
import firebaseSDK from '../server/fire'
import { AuthContext } from '../navigation/AuthProvider'
import { Data } from '../assets/data/Matches'

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

let x = 0;

function HomeScreen(props) {
	//TODO: Refresh must send and receive up to date data from backend
	const [refreshing, setRefreshing] = React.useState(false);
	const [matchExpiringNext, setMatchExpiringNext] = React.useState();
	const { currentUser, currentUserDocument, firebase, geo } = React.useContext(AuthContext);
	const [ userMatches, setUserMatches ] = React.useState([]);

	const sortUsers = (users) => {
		//matchExpiring = null;
		users.sort((a,b) => {return a.distance - b.distance});
		users.map(user => {
			if (user.pinned) {
				users.splice(users.indexOf(user), 1);
				users.unshift(user);
			}
			//if (user.matchTime < lowestTimeRemaining) matchExpiring = user; 
		});
		//setMatchExpiringNext(matchExpiring);
		return users
	} 

	const onRefresh = React.useCallback(() => {
	    setRefreshing(true);
	    //Pull new user info into data variable

	    wait(2000).then(() => setRefreshing(false));
	  }, [refreshing]);

	React.useEffect(() => {
		const currentLocation = {
			geohash: currentUserDocument.location.geohash, 
			geopoint: currentUserDocument.location.geopoint
		};
	    const geoRef = geo.query('users');
	    const query = geoRef.within(currentLocation, 5, 'location');
		query.subscribe(hit => setUserMatches(prevState => [...prevState, hit]));
	});

	return (
	  <SafeAreaView style={styles.container}>
	  	<ScrollView showsVerticalScrollIndicator={false}
	  	contentContainerStyle={{ flexGrow: 1}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
      	}>
      		{/*sortUsers(Data).map(user => {
      			return (
      				<MatchCard {...props} 
      				key={user.id}
      				name={user.name}
      				age={user.age}
      				tile={user.images}
      				thumbnail={user.thumbnail}
      				bio={user.bio}
      				distance={user.distance}
      				matchTime={user.matchTime}
      				pinned={user.pinned}
      				/>
      			);
      		})*/
      		sortUsers(userMatches).map((match, index) => {
      			console.log(match);
      			return (
      				<MatchCard {...props} 
      				key={index}
      				name={match.name}
      				age={match.age}
      				tile={match.images}
      				thumbnail={match.thumbnail}
      				bio={match.bio}
      				distance={match.hitMetadata.distance}
      				matchTime={firebaseSDK.getTimestamp()}
      				// pinned={user.pinned}
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