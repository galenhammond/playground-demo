import React, {Component} from 'react';
import { Text, SafeAreaView  } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { MaterialCommunityIcons, Feather, FontAwesome, AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

function HamburgerIcon(props) {
    return (
        <TouchableOpacity
        style={{
            width: 30,
            height: 30,
            marginLeft: 20
        }}
        onPress={()=>{
            this.props.navigation.openDrawer();
        }}>
	        <SafeAreaView style={{alignSelf: "center"}}>
	             <Ionicons name='ios-menu' size={28} color='#D8D8D8'/>
	        </SafeAreaView>
        </TouchableOpacity>
    );
}
export default HamburgerIcon;