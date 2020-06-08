import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useLinking from './navigation/useLinking';
import { VisbilitySwitch } from './components/VisibilitySwitch'
import HamburgerIcon from "./navigation/HamburgerMenu";
import LandingScreen from "./screens/LandingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import DrawerNavigator from "./navigation/DrawerNavigator";
import firebaseSDK from './server/fire.js';

const PlaygroundLoginStack = createStackNavigator();

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

        //Check if user signed in

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
          'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'sofiaprosoft-regular': require('./assets/fonts/SofiaProSoft-Regular.ttf'),
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

  userLoggedIn ? INITIAL_ROUTE_NAME = 'Playground' : INITIAL_ROUTE_NAME = 'Landing Page';
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Root>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <PlaygroundLoginStack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
              <PlaygroundLoginStack.Screen name="Landing Page" component={LandingScreen} options={{headerShown: false}} />
              <PlaygroundLoginStack.Screen name="Sign Up" component={SignUpScreen} options={{headerShown: false}} />
              <PlaygroundLoginStack.Screen name="Sign In" options={{headerShown: false}}>
                {props => <SignInScreen {...props} userSignedIn={setUserLoggedIn} /> }
              </PlaygroundLoginStack.Screen>
              <PlaygroundLoginStack.Screen name="Playground" component={DrawerNavigator} options={{headerShown: false, gestureEnabled: false}}/>
            </PlaygroundLoginStack.Navigator>
          </NavigationContainer>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
