import { Ionicons, SimpleLineIcons, Entypo, EvilIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Platform, Image, FlatList, View, TouchableOpacity} from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Toast, ActionSheet } from 'native-base';
import { PillTimer } from '../components/PillTimer'
import { Data } from '../assets/data/demo'

//onPress={props.navigation.navigate('Messages', {screen: "Chat"})
const SYSTEM_RED = '#ff3a30'
const BUTTONS = ['Message', 'Buy A Drink', 'Extend', 'Rewind', 'Unmatch', 'Cancel'];
const CANCEL_INDEX = 1

//TODO: set up power up mapping to more icon

export default function MatchCard(props) {
  const [studState, setStud] = React.useState(false);
  const BUTTONS = ['View in Browser', 'Cancel'];

  return (
  	<Card>
  		<CardItem>
	    	<Left>
	       <Thumbnail source={props.thumbnail} />
   	 		 <Body>
        		<Text style={styles.headerText}>{props.name}</Text>
        		<Text note>Sponsored</Text>
      		</Body>
      	</Left>
        <Right>
          <TouchableOpacity onPress={() => ActionSheet.show({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
          }, 
          buttonIndex => {
            setStud(!studState);
          }
          )}
          >  
            <Ionicons name="ios-more" size={24} color="#D8D8D8" />
          </TouchableOpacity>
        </Right>
    	</CardItem>
		  <CardItem cardBody>
        <Image source={props.tile} style={{height: 350, width: null, flex: 1}} />
      </CardItem>
      {props.bio && <Text style={{textAlign: 'left', fontFamily: "sfprodisplay-light", color: "#757E90", paddingHorizontal: "3%", paddingTop: "4%"}}>{props.bio}</Text>}
      <CardItem>
      	<Left>
        <Button transparent>
            <Icon active name="heart"/> 
              {/*onPress: color: #960f0f */}
              <Text style={styles.footerText}>i like this</Text>
          </Button>
      	</Left>
        	<Body>
          	<Button transparent onPress={() => props.navigation.navigate('Chats')}>
              <Icon active name="information-circle-outline" />
                <Text style={styles.footerText}>read more</Text>
            </Button>
        	</Body>
      	<Right>
        	<Button transparent>
            <Icon active name="share" />
              <Text style={styles.footerText}>share</Text>
          </Button>
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
	