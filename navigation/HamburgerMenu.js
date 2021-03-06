import React, {Component} from 'react';
import { Text, SafeAreaView  } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { MaterialCommunityIcons, Feather, FontAwesome, AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

function HamburgerIcon(props) {
    return (
        <TouchableOpacity
        //TODO: Increase area for greater responsiveness
        style={{
            width: 30,
            height: 30,
            marginLeft: 10
        }}
        onPress={(navigation) => props.navigation.openDrawer()} >
	        <SafeAreaView style={{alignSelf: "center"}}>
	             <Ionicons name='ios-menu' size={28} color='#D8D8D8'/>
	        </SafeAreaView>
        </TouchableOpacity>
    );
}
export default HamburgerIcon;