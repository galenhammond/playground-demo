import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome, AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HamburgerIcon from "../components/HamburgerMenu"

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html


  const MyHomeStack = createStackNavigator();
    function HomeStack({navigation}) {
      return (
        <MyHomeStack.Navigator screenOptions={{headerShown: true,
         headerTitle: "playground",
         headerStyle: {height: 65},
         headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
         textAlign: 'center', alignSelf: 'center'},
         headerLeft: props => <HamburgerIcon {...props} /> 
       }}>
          <MyHomeStack.Screen name="home" component={HomeScreen}/>
        </MyHomeStack.Navigator>
      );
    }

  const MyMessagesStack = createStackNavigator();
  function MessagesStack({navigation}) {
    return (
      <MyMessagesStack.Navigator screenOptions={{headerShown: true, 
        headerTitle: "playground",
        headerStyle: {height: 65},
        headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
        textAlign: 'center', alignSelf: 'center'},
        headerLeft: props => <HamburgerIcon {...props} /> 
      }}>
        <MyMessagesStack.Screen name="Messages" component={MessagesScreen} />
      </MyMessagesStack.Navigator>
      );
  }

  const MyProfileStack = createStackNavigator();
  function ProfileStack({navigation}) {
    return (
      <MyProfileStack.Navigator screenOptions={{headerShown: true,
        headerTitle: "playground",
        headerStyle: {height: 65},
        headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
        textAlign: 'center', alignSelf: 'center'},
        headerLeft: props => <HamburgerIcon {...props} /> 
       }}>
        <MyProfileStack.Screen name="Profile" component={ProfileScreen} />
      </MyProfileStack.Navigator>
      );
  }

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={MaterialCommunityIcons} focused={focused} name="heart" />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={Entypo} focused={focused} name="paper-plane" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={MaterialIcons} focused={focused} name="person-pin" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Messages':
      return 'Messages';
    case 'Profile':
      return 'Your Profile';
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
  },
});
