import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { MaterialCommunityIcons, Feather, FontAwesome, AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TopPicksScreen from '../screens/TopPicksScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: "playground", headerTitleStyle: {fontFamily: 'comfortaa-regular'}, headerLeft: props => <HamburgerIcon {...props} />, });


  const MyHomeStack = createStackNavigator();
    function HomeStack({navigation}) {
      return (
        <MyHomeStack.Navigator screenOptions={{headerShown: false}}>
          <MyHomeStack.Screen name="home" component={HomeScreen}/>
        </MyHomeStack.Navigator>
      );
    }

  const MyMessagesStack = createStackNavigator();
  function MessagesStack({navigation}) {
    return (
      <MyMessagesStack.Navigator screenOptions={{headerShown: false}}>
        <MyMessagesStack.Screen name="Messages" component={MessagesScreen} />
      </MyMessagesStack.Navigator>
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
        component={ProfileScreen}
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
    case 'Top Picks':
      return 'Here are your daily picks';
    case 'Profile':
      return 'Your Profile';
    case 'Messages':
      return 'Messages';
  }
}
