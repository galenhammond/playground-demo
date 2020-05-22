import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import CustomDrawerHeader  from "./components/DrawerHeader";
import useLinking from './navigation/useLinking';
import { VisbilitySwitch } from './components/VisibilitySwitch'
import HamburgerIcon from "./navigation/HamburgerMenu";
import SettingsScreen from "./screens/SettingsScreen";
import LandingScreen from "./screens/LandingScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();
const MySettingsStack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState('');
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
          'comfortaa-light': require('./assets/fonts/Comfortaa-Light.ttf'),
          'sfprodisplay-regular': require('./assets/fonts/SFProDisplay-Regular.ttf'),
          'sfprodisplay-light': require('./assets/fonts/SFProDisplay-Light.ttf'),
          'sfprodisplay-medium': require('./assets/fonts/SFProDisplay-Medium.ttf'),
          'sfprodisplay-semibold': require('./assets/fonts/SFProDisplay-SemiBold.ttf'),
          'sfprodisplay-thin': require('./assets/fonts/SFProDisplay-Thin.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Root>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          {userLoggedIn ?
            <Drawer.Navigator drawerContent={props => <CustomDrawerHeader {...props} 
            image={require('./assets/images/MichelleThumb.jpg')} 
            name="Michelle" />} >
              <Drawer.Screen name="Feed" component={BottomTabNavigator} options={{swipeEnabled: false}} />
              <Drawer.Screen name="Settings" component={SettingsStack} options={{swipeEnabled: false}} />
            </Drawer.Navigator>
          :
            <LoginStack.Navigator>
              <LoginStack.Screen name="Landing Page" component={LandingScreen} options={{headerShown: false}} />
              <LoginStack.Screen name="Sign Up" component={SignUpScreen} options={{headerShown: false}} />
            </LoginStack.Navigator>
          }
          </NavigationContainer>
        </View>
      </Root>
    );
  }
}

function SettingsStack({navigation}) {
  return (
    <MySettingsStack.Navigator>
      <MySettingsStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: true,
     headerTitle: "playground",
     headerStyle: {height: 65, borderBottomWidth: 0.5},
     headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
     textAlign: 'center', alignSelf: 'center'},
     headerLeft: props => <HamburgerIcon {...props} navigation={navigation} /> 
   }}/>
    </MySettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
