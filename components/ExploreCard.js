import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from '../assets/styles';
import Swiper from 'react-native-swiper'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Toast } from 'native-base'

const PRIMARY_COLOR = "#7444C0";
const SYSTEM_RED = '#ff3a30'
const SYSTEM_GREEN = '#30bf54'
const SYSTEM_YELLOW = '#ffcc00'
const SECONDARY_COLOR = "#5636B8";

const ExploreCard = ({
  actions,
  matchDocument,
  description,
  thumbnail,
  matches,
  images,
  name,
  barStatus,
  onPressLeft,
  onPressRight,
  status,
  variant,
  navigation,
  onNavigate
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  
  const onMessagePress = (navigation) => {
    onNavigate(false);
    navigation.navigate('Chats', { matchDocument: matchDocument});
  }

   const onProfilePress = (navigation) => {
    onNavigate(false);
    navigation.navigate('Match Profile', { matchDocument: matchDocument, matchProfile: true });
  }

  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 3 - 30 : fullWidth - 80,
      height: variant ? 127.5 : 350,
      margin: variant ? 0 : 20
    }
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30
    }
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      {variant ?
        <Image source={{uri: thumbnail}} style={imageStyle} />
      : <Image source={{uri: thumbnail}} style={imageStyle} />
      }


      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* DESCRIPTION */}
      {description && (
        <Text style={styles.descriptionCardItem}>{description}</Text>
      )}

      {/*BAR STATUS*/}
      {barStatus && (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name="ios-pin" size={11} color="#757E90" style={{marginTop: '0.7%', paddingRight: '1.5%'}}/>
          <Text style={styles.statusText}>{barStatus}</Text>
        </View>
        )}

      {/* STATUS */}
      {/* Lets use this as a "new match" indicator, blue badge appears when a match has not been clicked or messaged */}
      {status && (
        <View style={styles.status}>
          <View style={status === 'Online' ? styles.online : styles.online //styles.offline
          } />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}

    {/*VIEW PROFILE*/}
    {!variant && (
      <TouchableOpacity style={styles.exploreModalProfileItem} onPress={() => onProfilePress(navigation)}>
        <Text style={styles.matchesTextProfileItem}>
          View {name}'s Profile
        </Text>
      </TouchableOpacity>
    )}

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton}>
            <Icon name={"pin"}
            type={"entypo"}
            color={'#007bff'}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => Toast.show({
                text: "Hang tight! We're still putting this feature together...",
                buttonText: "Okay",
                duration: 2500,
                })}>
            <Icon name={"ios-wine"}
            type="ionicon" 
            color={'#960f0f'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onMessagePress(navigation)}>
            <Icon name={"ios-paper-plane"}
            type={"ionicon"}
            color={PRIMARY_COLOR} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniButton}>
            <Icon name={"back-in-time"}
            type={"entypo"} 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ExploreCard;