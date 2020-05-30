import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import SettingsScreen from "../screens/SettingsScreen";
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerHeader  from "../components/DrawerHeader";
import HamburgerIcon from './HamburgerMenu';

const PlaygroundDrawer = createDrawerNavigator();
const PlaygroundSettingsStack = createStackNavigator();

function SettingsStack({navigation}) {
  return (
    <PlaygroundSettingsStack.Navigator>
      <PlaygroundSettingsStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: true,
     headerTitle: "playground",
     headerStyle: {borderBottomWidth: 0.5},
     headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
     textAlign: 'center', alignSelf: 'center'},
     headerLeft: props => <HamburgerIcon {...props} navigation={navigation} /> 
   }}/>
    </PlaygroundSettingsStack.Navigator>
  );
}

function DrawerNavigator({navigation, route}) {
	return (
		<PlaygroundDrawer.Navigator drawerContent={props => <CustomDrawerHeader {...props} 
        image={require('../assets/images/MichelleThumb.jpg')} 
        name="Michelle" />} >
          <PlaygroundDrawer.Screen name="Playground" component={BottomTabNavigator} options={{swipeEnabled: false}} />
          <PlaygroundDrawer.Screen name="Settings" component={SettingsStack} options={{swipeEnabled: false}} />
        </PlaygroundDrawer.Navigator>
	)
}
export default DrawerNavigator;