import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, RefreshControl, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import MatchCard from '../components/MatchCard';
import MapView from 'react-native-maps';
import { Data } from '../assets/data/demo';
import CardItem from '../components/CardItem';
import Modal from 'react-native-modal';

function HomeScreen(props) {
	//TODO: Inject MatchCards as a callback rather than hard coding them
	//TODO: Refresh must send and receive up to date data from backend
	const [locationSearch, setLocationSearch] = React.useState();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [modalData, setModalData] = React.useState({});
	//const unsubscribe = RNLocation.subscribeToHeadingUpdates(info => console.log(info));
	const renderModal = (item) => {
		setModalVisible(true);
		setModalData(item);
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
				<CardItem
				image={modalData.image} 
				name={modalData.name} 
				description={modalData.bio}
				status={"100m"}
				actions
				/>
			</Modal>
			<MapView style={styles.map} initialRegion={{
		      latitude: 45.250625,
		      longitude: -75.903906,
		      latitudeDelta: 0.0522,
		      longitudeDelta: 0.0021,
		      }}
		      //customMapStyle={mapStyle}
		      provider={'google'}
		      showsUserLocation
		       />  
		    <View>
			  <FlatList
			  styles={styles.matchList}
		      horizontal
		      data={Data}
		      keyExtractor={(item, index) => index.toString()}
		      renderItem={({ item }) => (
			    <TouchableOpacity onPress={() => renderModal(item)}>
			      <CardItem
			        image={item.image}
			        name={item.name}
			        status={"100m"}
			        variant
			      />
		        </TouchableOpacity>
		    	)}
		  	  />
			</View>
		<SearchBar lightTheme
		onChangeText={val => setLocationSearch(val)}
	  	value={locationSearch} placeholder={"Enter a location"}
		style={{alignSelf: "flex-end"}} containerStyle={{
	  	backgroundColor: 'white', borderTopWidth: 0, borderBottomWidth: 0, borderRadius: 25, height: '9%', 
	  	justifyContent: 'center'}} inputContainerStyle={{
	  	backgroundColor: "white", borderRadius: 25}} inputStyle={{
	  	fontFamily: "sfprodisplay-light",
	  	fontSize: 20
	  }} />
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
		flexDirection: 'column-reverse',
		justifyContent: "space-between"
	},
	map: {
		position: 'absolute',
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	},
	matchList: {
		alignSelf: 'flex-end',
		position: 'absolute',
		bottom: 0
	}
});
export default HomeScreen;
