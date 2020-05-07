import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { DrawerItemList, DrawerNavigation, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

export default function CustomDrawerHeader(props) {
  return (
  <View style={{flex: 1}}>
    <View
      style={{
        backgroundColor: '#000000',
        height: 140,
        alignItems: 'left',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 30, marginLeft: 10, fontFamily: "comfortaa-regular" }}>Username</Text>
    </View>
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <DrawerItemList {...props} />
    </ScrollView>
  </View>
  );
}
