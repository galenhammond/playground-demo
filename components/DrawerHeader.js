import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { DrawerItemList, DrawerNavigation, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Thumbnail } from 'native-base'
import { Ionicons, Entypo } from '@expo/vector-icons'

const ONLINE_STATUS = "#46A575";
const GRAY = "#757E90";
const SYSTEM_BLUE = '#007bff'

export default function CustomDrawerHeader(props) {
  return (
  <View style={{flex: 1}}>
    <View style={{
          justifyContent: 'center',
          backgroundColor: '#f5fffe',
          height: 140,
          alignItems: 'left',
          marginLeft: "4%"
        }}>
      <View style={{flexDirection:'row', paddingVertical: "2%", alignItems: 'center'}}>
        <Thumbnail small source={props.image} style={{ marginBottom: "4%"}}/>
        <Text style={{ color: 'black', fontSize: 30, marginLeft: "4%", fontFamily: "comfortaa-regular" }}>{props.name}</Text>
        <View style={styles.online} />
      </View>
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
    paddingRight: "50%"
  },
  iconCount: {
    flexDirection: 'row',
  },
  online: {
    width: 9,
    height: 9,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 6,
    marginLeft: 12
  },
})