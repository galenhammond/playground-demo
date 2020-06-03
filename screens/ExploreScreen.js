import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl, FlatList, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar, Button, Icon } from 'react-native-elements';
import MatchCard from '../components/MatchCard';
import MapView, { Circle } from 'react-native-maps';
import { Data } from '../assets/data/Matches';
import ExploreCard from '../components/ExploreCard';
import Modal from 'react-native-modal';

const SYSTEM_BLUE = '#007bff'

function ExploreScreen(props) {
	//TODO: Inject MatchCards as a callback rather than hard coding them
	//TODO: Refresh must send and receive up to date data from backend
	const [locationSearch, setLocationSearch] = React.useState();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [userModalData, setUserModalData] = React.useState({});
  const [listVisible, setListVisible] = React.useState(false);
	//const unsubscribe = RNLocation.subscribeToHeadingUpdates(info => console.log(info));
  const onNavigate = (value) => {
    setModalVisible(value);
  }

	const renderModal = (user) => {
		setUserModalData(user);
    setModalVisible(true);
	}

	const closeModal = () => {
		setModalVisible(false);
	}

	return (
		<View style={[styles.container, isModalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
			<Modal
			isVisible={isModalVisible} 
			onBackdropPress={closeModal}
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
			<MapView style={styles.map} initialRegion={{
		      latitude: 45.250625,
		      longitude: -75.903906,
		      latitudeDelta: 0.0622,
		      longitudeDelta: 0.0121,
		      }}
		      //customMapStyle={mapStyle}
		      provider={'google'}
		      showsUserLocation
          showsMyLocationButton
          followsUserLocation={true}
		      >
        <Circle 
        center={{latitude: 45.250625, longitude: -75.903906}} 
        radius={2500} fillColor={'rgba(0, 157, 255, 0.1)'} 
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
        <Button iconRight icon={ <Icon name={"flash"} type={"entypo"} size={15} color={SYSTEM_BLUE}/> } 
        containerStyle={styles.boostButtonContainer} 
        titleStyle={styles.listButtonTitle} raised title={"Boost"} 
        type={'clear'}/>
         <Button iconRight icon={ <Icon name={"filter"} type={"antdesign"} size={15} color={SYSTEM_BLUE}/> } 
        containerStyle={styles.boostButtonContainer} 
        titleStyle={styles.listButtonTitle} raised title={"Filter"} 
        type={'clear'}/>
      </View>
      {listVisible ?
		  <View style={styles.listContainer}>
        <Button iconRight icon={ <Icon name={"ios-arrow-down"} type={"ionicon"} size={15}/> } 
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
			    <TouchableOpacity onPress={() => renderModal(item)}>
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
        : <Button iconRight icon={ <Icon name={"ios-arrow-up"} type={"ionicon"} size={15}/> } 
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
    borderRadius: 25,
    position: 'absolute',
    bottom: 10
  },
  listCloseButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: "40%",
    borderRadius: 25,
  },
  listButtonTitle: {
    fontSize: 15,
    paddingHorizontal: 5,
    color: 'black'
  },
  boostButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fafafa',
    width: "22%",
    borderRadius: 25,
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