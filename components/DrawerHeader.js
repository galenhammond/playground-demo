import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { DrawerItemList, DrawerNavigation, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Thumbnail } from 'native-base'

export default function CustomDrawerHeader(props) {
  return (
  <View style={{flex: 1}}>
    <View
      style={{
        flexDirection:'row',
        backgroundColor: '#000000',
        height: 140,
        alignItems: 'center',
      }}
    >
      <Thumbnail small source={props.image} style={{marginLeft: "4%", marginBottom: "4%"}}/>
      <Text style={{ color: 'white', fontSize: 30, marginLeft: "4%", fontFamily: "comfortaa-regular" }}>{props.name}</Text>
    </View>
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <DrawerItemList {...props} />
    </ScrollView>
  </View>
  );
}
