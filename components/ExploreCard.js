import React from 'react';
import styles from '../assets/styles';
import Swiper from 'react-native-swiper'

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
const PRIMARY_COLOR = "#7444C0";
const SYSTEM_RED = '#ff3a30'
const SYSTEM_GREEN = '#30bf54'
const SYSTEM_YELLOW = '#ffcc00'
const SECONDARY_COLOR = "#5636B8";

const ExploreCard = ({
  actions,
  description,
  thumbnail,
  matches,
  images,
  name,
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
    navigation.navigate('Chats');
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
        <Image source={thumbnail} style={imageStyle} />
      : <Image source={thumbnail} style={imageStyle} />
      }

      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" /> {matches}% Match!
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* DESCRIPTION */}
      {description && (
        <Text style={styles.descriptionCardItem}>{description}</Text>
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

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton}>
            <Icon name={"pin"}
            type={"entypo"}
            color={'#007bff'}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
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