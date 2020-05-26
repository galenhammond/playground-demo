import { Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Platform, Image, FlatList, View, TouchableOpacity} from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Toast, ActionSheet } from 'native-base';
import Swiper from 'react-native-swiper'
import { PillTimer } from '../components/PillTimer'
import { Data } from '../assets/data/demo'

//onPress={props.navigation.navigate('Messages', {screen: "Chat"})
const SYSTEM_RED = '#ff3a30'

//TODO: set up power up mapping to more icon

export default function MatchCard(props) {
  const [buttonClicked, setButtonClicked] = React.useState();
  const [isVisible, setVisible] = React.useState(true);
  const BUTTONS = ['Pin ' + props.name + ' for 24 Hours', 'Rewind ' + props.name + "'s Timer", 'Unmatch ' + props.name, 'Cancel'];
  const UNMATCH_INDEX = 2
  const CANCEL_INDEX = 3
  const LOW_TIME_ALERT = 24000000

  const onUnmatch = () => {
    //TODO: Delete user from the data array
    setVisible(false);
  }

  return (
    isVisible && 
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
              destructiveButtonIndex: UNMATCH_INDEX,
            }, 

            buttonIndex => {
              setButtonClicked(buttonIndex);
              console.log(buttonClicked);
              if (buttonClicked == UNMATCH_INDEX) onUnmatch();
            }
            )}
            >  
              <Ionicons name="ios-more" size={24} color="#D8D8D8" />
            </TouchableOpacity>
            {props.pinned && <Entypo name={'pin'} size={18} color={'#009dff'} />}
            { (!props.pinned && props.matchTime + LOW_TIME_ALERT <= Date.now()) && 
             <SimpleLineIcons name="clock" size={15} color={SYSTEM_RED} /> }
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
	