import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Platform, Image, FlatList, View } from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { PillTimer } from '../components/PillTimer'
import { Data } from '../assets/data/demo'

export default function MatchCard(props) {
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
          <PillTimer />
        </Right>
    	</CardItem>
		  <CardItem cardBody>
        <Image source={props.tile} style={{height: 200, width: null, flex: 1}} />
      </CardItem>
      {props.bio ?
        <Text style={{textAlign: 'center', fontFamily: "sfprodisplay-light", color: "#757E90", paddingHorizontal: "3%", paddingTop: "4%"}}>{props.bio}</Text>
        : <View />}
      <CardItem>
      	<Left>
        	<Button transparent>
        		<Icon active name="wine" />
          		<Text style={styles.footerText}>buy a drink</Text>
        	</Button>
      	</Left>
      	<Body>
        	<Button transparent>
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
	