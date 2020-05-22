import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome, AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HamburgerIcon from "../navigation/HamburgerMenu";
import { SearchBar } from 'react-native-elements';
import ChatScreen from '../screens/ChatScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
const MyHomeStack = createStackNavigator();
const MyMessagesStack = createStackNavigator();
const MyProfileStack = createStackNavigator();

function HomeStack({ navigation }) {
  return (
    <MyHomeStack.Navigator>
      <MyHomeStack.Screen name="home" component={HomeScreen} options={{headerShown: true,
     headerTitle: "playground",
     headerStyle: {borderBottomWidth: 0.5},
     headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
     textAlign: 'center', alignSelf: 'center'},
     headerLeft: props => <HamburgerIcon {...props} navigation={navigation} /> }}/>
     <MyHomeStack.Screen name="Chats" component={ChatScreen} options={{
      headerBackTitle: "Feed"
     }}/>
    </MyHomeStack.Navigator>
  );
}

function ExploreStack({ navigation }) {
  return (
    <MyHomeStack.Navigator>
      <MyHomeStack.Screen name="explore" component={ExploreScreen} options={{headerShown: true,
     headerTitle: "playground",
     headerStyle: { borderBottomWidth: 0.5},
     headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
     textAlign: 'center', alignSelf: 'center'},
     headerLeft: props => <HamburgerIcon {...props} navigation={navigation} /> }}/>
     <MyHomeStack.Screen name="Chats" component={ChatScreen} options={{
      headerBackTitle: "Explore"
     }}/>
    </MyHomeStack.Navigator>
  );
}

function MessagesStack(props) {
return (
  <MyMessagesStack.Navigator initialRouteName={"messages"}>
    <MyMessagesStack.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false, }} />
    <MyMessagesStack.Screen name="Chats" component={ChatScreen} options={{ title: props.userFirstName }} />
  </MyMessagesStack.Navigator>
  );
}

function ProfileStack({ navigation }) {
return (
  <MyProfileStack.Navigator screenOptions={{headerShown: true}}>
    <MyProfileStack.Screen name="Profile" options={{headerLeft: props => <HamburgerIcon {...props} navigation={navigation} />}}>
      {props => <ProfileScreen {...props} 
      image={require('../assets/images/MichelleThumb.jpg')}
      name="Michelle"
      age="21"
      bio="Here for a good time, not a long time!" /> }
    </MyProfileStack.Screen>
  </MyProfileStack.Navigator>
  );
}

function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  return (
    <BottomTab.Navigator lazy={false} initialRouteName={INITIAL_ROUTE_NAME} >
      <BottomTab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Ionicons} focused={focused} name="ios-heart" />,
        }} /> 

        <BottomTab.Screen 
        name="explore" 
        component={ExploreStack}
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Ionicons} focused={focused} name="ios-search" />,
        }} /> 

      <BottomTab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Ionicons} focused={focused} name="ios-chatbubbles" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Ionicons} focused={focused} name="ios-contact" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
  },
});

export default BottomTabNavigator;
