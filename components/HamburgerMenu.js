import React, {Component} from 'react';
import { Text, SafeAreaView  } from 'react-native';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/SimpleLineIcons';

function HamburgerIcon(props) {
    return (
        <TouchableOpacity
        style={{
            width: 44,
            height: 44,
            marginLeft: 20
        }}
        onPress={()=>{
            this.props.navigation.openDrawer();
        }}>
	        <SafeAreaView>
	             <Icon name='menu' size={20} color='black'/>
	        </SafeAreaView>
        </TouchableOpacity>
    );
}
export default HamburgerIcon;