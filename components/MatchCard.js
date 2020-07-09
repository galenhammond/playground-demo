import { Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Platform, Image, FlatList, View, TouchableOpacity} from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Toast, ActionSheet } from 'native-base';
import Swiper from 'react-native-swiper'
import { PillTimer } from '../components/PillTimer'
import styles from '../assets/styles';

//onPress={props.navigation.navigate('Messages', {screen: "Chat"})
const SYSTEM_RED = '#ff3a30'

//TODO: set up power up mapping to more icon

export default function MatchCard(props) {
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
           <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate("Match Profile", { matchDocument: props.matchDocument, matchProfile: true } )}>
  	         <Thumbnail source={{uri: props.matchDocument.thumbnail}} />
       	 		 <Body>
            		<Text style={{fontFamily: 'sfprodisplay-regular'}}>{props.matchDocument.name}</Text>
            		<Text note>{props.matchDocument.age}</Text>
          	 </Body>
           </TouchableOpacity>
        	</Left>
          <Right>
            <TouchableOpacity onPress={() => ActionSheet.show({
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: UNMATCH_INDEX,
            }, 

            buttonIndex => {
              switch(buttonIndex) {
                case UNMATCH_INDEX: 
                  onUnmatch();
                  break;
                default:
                //do nothing
              }
            }
            )}
            >  
              <Ionicons name="ios-more" size={24} color="#D8D8D8" />
            </TouchableOpacity>
            {props.pinned && <Entypo name={'pin'} size={18} color={'#add5ff'} />}
            { (!props.pinned && props.matchTime + LOW_TIME_ALERT <= Date.now()) && 
             <SimpleLineIcons name="clock" size={15} color={SYSTEM_RED} /> }
            {/*<PillTimer />*/}
          </Right>
      	</CardItem>
  		  <CardItem cardBody>
          <Swiper showsPagination={false} loop={false} bounces={true} height={350}>
            {props.matchDocument.images.map((tile, index) => {
              return (
                <Image key={index} source={{uri: tile}} style={{height: 350, width: null, flex: 1}} />
                );
              })
            }
          </Swiper>
        </CardItem>
      {/* textColor: #828181*/}
        {props.matchDocument.bio && <Text style={{fontSize: 13, textAlign: 'left', color: "#292929", paddingHorizontal: "3%", paddingTop: "4%"}}>{props.matchDocument.bio}</Text>}
        {/*<Text style={{color: "#D8D8D8", paddingHorizontal: "3%", paddingTop: "2%", fontFamily: "sfprodisplay-light", fontSize: 14}}>43:26</Text>*/}
        <CardItem>
        	<View style={{flex: 1, flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
          	<TouchableOpacity style={styles.feedButtonItem} onPress={() => 
              Toast.show({
                text: "Hang tight! We're still putting this feature together...",
                buttonText: "Okay",
                duration: 2500,
                })}>
              <Text style={{color: 'white'}}>
                <Ionicons name="ios-wine" size={20} />
              </Text>
              <Text style={styles.matchCardButton}>buy a drink</Text>
            </TouchableOpacity>
          	<TouchableOpacity style={styles.feedButtonItem2} onPress={() => props.navigation.navigate('Chats')}>
              <Text style={{color: 'white'}}>
                <Ionicons name="ios-chatbubbles" size={20} />
              </Text>
            	<Text style={styles.matchCardButton}>message</Text>
          	</TouchableOpacity>
            <View>
            	<Text style={styles.matchDistanceText}>{props.matchDocument.hitMetadata.distance.toFixed(1)} km away</Text>
            </View>
          </View>
        </CardItem>
   	</Card>
  );
}

	