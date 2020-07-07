import React from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, Switch, SafeAreaView } from 'react-native'
import { DrawerItemList, DrawerNavigation, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Thumbnail, ActionSheet } from 'native-base'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { AuthContext } from '../navigation/AuthProvider'

const ONLINE_STATUS = "#46A575";
const GRAY = "#757E90";
const SYSTEM_GREEN = '#30bf54'
const SYSTEM_BLUE = '#007bff'

export default function CustomDrawerHeader(props) {
  const { logout, currentUser, currentUserDocument, setCurrentUserDocument } = React.useContext(AuthContext);
  const [userVisible, setUserVisible] = React.useState(true);

  return (
  <SafeAreaView style={{flex: 1}}>
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
                        setCurrentUserDocument(null);
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
        <Thumbnail small source={currentUserDocument ? {uri: currentUserDocument.thumbnail } : null} style={{ marginBottom: "4%"}}/>
        <Text style={{ color: 'black', fontSize: 30, marginLeft: "4%", fontFamily: "comfortaa-regular" }}>{currentUser ? currentUser.displayName : null}</Text>
        <View style={styles.online} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <View style={styles.iconCount}>
          <Ionicons name={'ios-wine'} size={18} color={'#add5ff'} />
          <Text style={{marginLeft: "8%"}}>{currentUserDocument.powerups.buy_a_drink.remaining}</Text>
        </View>
        <View style={styles.iconCount}>
          <Entypo name={'pin'} size={18} color={'#add5ff'} />
          <Text style={{marginLeft: "8%"}}>{currentUserDocument.powerups.pin.remaining}</Text>
        </View>
        <View style={styles.iconCount}>
          <Entypo name={'flash'} size={18} color={'#add5ff'} />
          <Text style={{marginLeft: "8%"}}>{currentUserDocument.powerups.boost.remaining}</Text>
        </View>
        <View style={styles.iconCount}>
          <Entypo name={'back-in-time'} size={18} color={'#add5ff'} />
          <Text style={{marginLeft: "8%"}}>{currentUserDocument.powerups.rewind.remaining}</Text>
        </View>
      </View>
      <View style={styles.tierContainer}>
        <TouchableOpacity>
          <Text style={{ color: '#009dff'}}>Upgrade to plus⁺ today!</Text>
        </TouchableOpacity>
      </View>
       <View style={{
            flexDirection: 'row',
            marginVertical: '4%',
            alignItems: "center",
            justifyContent:"space-even",
            marginLeft: "4%"
             }}>
             { userVisible ?
        <Text style={{paddingRight: 10, color: SYSTEM_GREEN}}>Visible</Text> 
        : <Text style={{paddingRight: 10, color: "#757E90" }}>Visible</Text> 
        }
        <Switch value={userVisible} onValueChange={val => {setUserVisible(val)} }/>
      </View>
    </View>
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <DrawerItemList {...props} />
    </ScrollView>
  </SafeAreaView>
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