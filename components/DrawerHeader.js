import React from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { DrawerItemList, DrawerNavigation, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Thumbnail, ActionSheet } from 'native-base'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { AuthContext } from '../navigation/AuthProvider'

const ONLINE_STATUS = "#46A575";
const GRAY = "#757E90";
const SYSTEM_BLUE = '#007bff'

export default function CustomDrawerHeader(props) {
  const { logout } = React.useContext(AuthContext);

  return (
  <View style={{flex: 1}}>
    <View style={{
          justifyContent: 'center',
          backgroundColor: '#f5fffe',
          height: 180,
          alignItems: 'left',
          marginLeft: "4%"
        }}>
      <TouchableOpacity style={{flexDirection:'row', paddingVertical: "2%", alignItems: 'center'}} onPress={() => {
        ActionSheet.show({
              options: ['Log Out', 'Cancel'],
              cancelButtonIndex: 1,
              destructiveButtonIndex: 0,
            },

            buttonIndex => {
              switch(buttonIndex) {
                case 0: 
                  logout(
                    async (success) => {
                      try {
                        await AsyncStorage.removeItem('@Playground_token');
                      } catch(e) {
                        console.log('Unable to remove login token');
                      }
                      console.log("Logged Out");
                  }, () => {
                    console.log("An error occured");
                  });
                  break;
                default:
                //do nothing
              }
        });
      }} >
        <Thumbnail small source={props.image} style={{ marginBottom: "4%"}}/>
        <Text style={{ color: 'black', fontSize: 30, marginLeft: "4%", fontFamily: "comfortaa-regular" }}>{props.name}</Text>
        <View style={styles.online} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <View style={styles.iconCount}>
          <Ionicons name={'ios-wine'} size={18} color={'#009dff'} />
          <Text style={{marginLeft: "8%"}}>1</Text>
        </View>
        <View style={styles.iconCount}>
          <Entypo name={'pin'} size={18} color={'#009dff'} />
          <Text style={{marginLeft: "8%"}}>3</Text>
        </View>
        <View style={styles.iconCount}>
          <Entypo name={'flash'} size={18} color={'#009dff'} />
          <Text style={{marginLeft: "8%"}}>1</Text>
        </View>
        <View style={styles.iconCount}>
          <Entypo name={'back-in-time'} size={18} color={'#009dff'} />
          <Text style={{marginLeft: "8%"}}>0</Text>
        </View>
      </View>
      <View style={styles.tierContainer}>
        <TouchableOpacity>
          <Text style={{ color: '#009dff'}}>Upgrade to plus⁺ today!</Text>
        </TouchableOpacity>
      </View>
    </View>
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <DrawerItemList {...props} />
    </ScrollView>
  </View>
  );
}
//#d9fffd

const styles=StyleSheet.create({
  iconContainer: {
    width: '100%', 
    marginLeft: "4%", 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingRight: "50%",
    paddingTop: '1%'
  },
  iconCount: {
    flexDirection: 'row',
  },
  tierContainer: {
    marginLeft: "4%", 
    paddingTop: '6%'
  },
  online: {
    width: 9,
    height: 9,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 6,
    marginLeft: 12
  },
})