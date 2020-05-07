import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Platform, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

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
      	</CardItem>
		<CardItem cardBody>
	  		<Image source={props.tile} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
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
            	<Text>{props.distance}m away</Text>
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
	