import { Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Platform, Image, FlatList, View, TouchableOpacity} from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Toast, ActionSheet } from 'native-base';
import Swiper from 'react-native-swiper'
import { PillTimer } from '../components/PillTimer'
import { Data } from '../assets/data/demo'

//onPress={props.navigation.navigate('Messages', {screen: "Chat"})
const SYSTEM_RED = '#ff3a30'
const BUTTONS = ['Message', 'Buy A Drink', 'Extend', 'Rewind', 'Unmatch', 'Cancel'];
const UNMATCH_INDEX = 2
const CANCEL_INDEX = 3

//TODO: set up power up mapping to more icon

export default function MatchCard(props) {
  const [studState, setStud] = React.useState(false);
  const BUTTONS = ['Pin ' + props.name + ' for 24 Hours', 'Rewind ' + props.name + "'s Timer", 'Unmatch ' + props.name, 'Cancel'];

  return (
  	<Card>
  		<CardItem>
	    	<Left>
	       <Thumbnail source={props.thumbnail} />
   	 		 <Body>
        		<Text style={styles.headerText}>{props.name}</Text>
        		<Text note>{props.age}</Text>
      		</Body>
      	</Left>
        <Right>
          <TouchableOpacity onPress={() => ActionSheet.show({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: UNMATCH_INDEX
          }, 
          buttonIndex => {
            setStud(!studState);
          }
          )}
          >  
            <Ionicons name="ios-more" size={24} color="#D8D8D8" />
          </TouchableOpacity>
          {props.pinned ? <Entypo name={'pin'} size={18} color={'#009dff'} />
          : <SimpleLineIcons name="clock" size={15} color={SYSTEM_RED} /> }
          {/*<PillTimer />*/}
        </Right>
    	</CardItem>
		  <CardItem cardBody>
        <Swiper showsPagination={false} loop={false} bounces={true} height={350}>
          {props.tile.map(tile => {
            return (
              <Image source={tile} style={{height: 350, width: null, flex: 1}} />
              );
            })
          }
        </Swiper>
      </CardItem>
    {/* textColor: #828181*/}
      {props.bio && <Text style={{fontSize: 16, textAlign: 'left', fontFamily: "sfprodisplay-light", color: "#292929", paddingHorizontal: "3%", paddingTop: "4%"}}>{props.bio}</Text>}
      <CardItem>
      	<Left>
        	<Button transparent onPress={() => Toast.show({
            text: "Hang tight! We're still putting this feature together...",
            buttonText: "Okay",
            duration: 2500,
            })}>
        		<Icon active name="wine" />
          		<Text style={styles.footerText}>buy a drink</Text>
        	</Button>
      	</Left>
        	<Body>
          	<Button transparent onPress={() => props.navigation.navigate('Chats')}>
          		<Icon active name="chatbubbles" />
            	  <Text style={styles.footerText}>message</Text>
          	</Button>
        	</Body>
      	<Right>
        	<Text style={{fontSize: 13}}>{props.distance}m away</Text>
      	</Right>
      </CardItem>
 	</Card>
  );
}

const styles = StyleSheet.create({
	headerText: {
		fontFamily: 'sfprodisplay-regular',
	},
	lowerText: {
		fontFamily: "comfortaa-regular"
	}
});
	