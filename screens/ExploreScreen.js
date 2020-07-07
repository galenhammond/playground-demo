import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl, FlatList, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar, Button, Icon } from 'react-native-elements';
import ExpiryTimer from '../components/ExpiryTimer'
import { ActionSheet } from 'native-base'
import MatchCard from '../components/MatchCard';
import MapView, { Circle } from 'react-native-maps';
import { Data } from '../assets/data/Matches';
import ExploreCard from '../components/ExploreCard';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';

const SYSTEM_BLUE = '#add5ff'
const LONG_DELTA = 0.121;
const LAT_DELTA = 0.0422;

function ExploreScreen(props) {
	//TODO: Inject MatchCards as a callback rather than hard coding them
	//TODO: Refresh must send and receive up to date data from backend
	const [locationSearch, setLocationSearch] = React.useState();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [userModalData, setUserModalData] = React.useState({});
  const [listVisible, setListVisible] = React.useState(false);
  const [isBoosted, setBoosted] = React.useState(false);
  const mapRef = React.useRef(null);

  const [userLocation, setUserLocation] = React.useState({
    longitude: -122.406417,
    latitude: 37.785834
  });

  const [mapRegion, setMapRegion] = React.useState({
    latitude: userLocation.longitude,
    longitude: userLocation.latitude,
    latitudeDelta: LAT_DELTA,
    longitudeDelta: LONG_DELTA
  });

  React.useEffect(() => {
    var location;
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        /*setErrorMsg('Permission to access location was denied');*/
      }

      location = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeout: 10000,
        distanceInterval: 25,
      }, _onLocationChange);
    })();

    //Unsub to locatiom updates here
    /*return () => {
      location.remove();
    }*/
  },[]);

  const _onLocationChange = (location) => {
    /*Logic to send location to Firebase*/
    setUserLocation(location.coords);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LAT_DELTA,
      longitudeDelta: LONG_DELTA
    });
    try {
      mapRef.current.animateToRegion({
        region: mapRegion,
        duration: 500
      });
    } catch(e) {
      console.log(e);
    }
  }

  const useBoost = () => {
    setBoosted(true);
    /*Decrease users boost stash*/
  }

  const onNavigate = (value) => {
    setModalVisible(value);
  }

	const _renderModal = (user) => {
		setUserModalData(user);
    setModalVisible(true);
	}

	const _closeModal = () => {
		setModalVisible(false);
	}

	return (
		<View style={[styles.container, isModalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
			<Modal
			isVisible={isModalVisible} 
			onBackdropPress={_closeModal}
			>
				<ExploreCard
				images={userModalData.images} 
        thumbnail={userModalData.thumbnail} 
				name={userModalData.name} 
				description={userModalData.bio}
				status={userModalData.distance + 'm'}
        navigation={props.navigation}
        onNavigate={onNavigate}
				actions
				/>
			</Modal>
			<MapView 
        style={styles.map} 
        region={mapRegion}
	      //customMapStyle={mapStyle}
	      provider={'google'}
	      showsUserLocation
        showsMyLocationButton
        ref={mapRef}
		  >
        <Circle 
        center={{latitude: userLocation.latitude, longitude: userLocation.longitude}} 
        radius={isBoosted ? 5000 : 2500} fillColor={'rgba(0, 157, 255, 0.1)'} 
        strokeColor={'rgba(0, 157, 255, 0.1)'} geodesic
          />
      </MapView>
      <SearchBar lightTheme
        onChangeText={val => setLocationSearch(val)}
        value={locationSearch} placeholder={"Enter a location..."}
        style={{alignSelf: "flex-end"}} containerStyle={{
        backgroundColor: 'white', borderTopWidth: 0, borderBottomWidth: 0, borderRadius: 25, height: 40, 
        justifyContent: 'center',}} inputContainerStyle={{
        backgroundColor: "white", borderRadius: 25,}} inputStyle={{
        fontFamily: "sfprodisplay-light",
        fontSize: 18
        }} />  
      <View style={styles.boostContainer}>
        <Button 
        iconRight 
        icon={ <Icon name={"flash"} type={"entypo"} size={13} color={SYSTEM_BLUE}/> } 
        containerStyle={styles.boostedButtonContainer} 
        titleStyle={styles.listButtonTitle} 
        raised 
        title={"Boost"}
        onPress={useBoost} 
        type={'clear'}/>
        {isBoosted && 
          (<TouchableOpacity style={styles.listButtonTitle, {flexDirection: 'row',}} 
            onPress={() => ActionSheet.show({
              title: 'WARNING: Ending this boost prematurely will result in the loss of the remainder of the boost',
              options: ['End Boost', 'Cancel'],
              cancelButtonIndex: 1,
              destructiveButtonIndex: 0,
            }, 

            buttonIndex => {
              switch(buttonIndex) {
                case 0: 
                  setBoosted(false);
                  break;
                default:
                  //do nothing
              } 
            }
            )}>
            <Text>Boosted for </Text>  
              <ExpiryTimer setTime={3600}/>
          </TouchableOpacity>
          )}
         <Button 
         iconRight 
         icon={ <Icon name={"filter"} type={"antdesign"} size={13} color={SYSTEM_BLUE}/> } 
        containerStyle={styles.boostButtonContainer} 
        titleStyle={styles.listButtonTitle} 
        raised 
        title={"Filter"} 
        type={'clear'}/>
      </View>

      {listVisible ?
		  <View style={styles.listContainer}>
        <Button iconRight icon={ <Icon name={"ios-arrow-down"} type={"ionicon"} size={13}/> } 
        containerStyle={styles.listCloseButtonContainer} 
        titleStyle={styles.listButtonTitle} title={"Hide Matches"} 
        type={"clear"} onPress={() => setListVisible(false)} />
			  <FlatList
        showsHorizontalScrollIndicator={false}
			  styles={styles.matchList}
		      horizontal
		      data={Data}
		      keyExtractor={(item, index) => index.toString()}
		      renderItem={({ item }) => (
			    <TouchableOpacity onPress={() => _renderModal(item)}>
			      <ExploreCard
			        thumbnail={item.thumbnail}
			        name={item.name}
			        status={item.distance + 'm'}
			        variant
			      />
		        </TouchableOpacity>
		    	)}
		  	  />
        </View>
        : <Button iconRight icon={ <Icon name={"ios-arrow-up"} type={"ionicon"} size={13}/> } 
        containerStyle={styles.listOpenButtonContainer} 
        titleStyle={styles.listButtonTitle} raised title={"Show Matches"} 
        type={'clear'} onPress={() => setListVisible(true)} />
    }
	</View>
	);
}

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	map: {
		position: 'absolute',
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	},
	matchList: {
		alignItems: 'center',
    justifyContent: 'center',
	},
  listOpenButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: "40%",
    borderRadius: 13,
    position: 'absolute',
    bottom: 10
  },
  listCloseButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: "40%",
    borderRadius: 13,
  },
  listButtonTitle: {
    fontSize: 13,
    justifyContent: 'center',
    paddingHorizontal: 3,
    fontFamily: 'comfortaa-regular',
    color: 'black'
  },
  boostButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    width: "22%",
    borderRadius: 10,
  },
  boostedButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fafafa',
    width: "22%",
    borderRadius: 10,
  },
  boostContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
export default ExploreScreen;