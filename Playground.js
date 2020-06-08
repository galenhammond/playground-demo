import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import useLinking from './navigation/useLinking';
import HamburgerIcon from "./navigation/HamburgerMenu";
import AppDrawer from "./navigation/AppDrawer";
import LoginStack from './navigation/LoginStack'
import { AuthProvider } from './navigation/AuthProvider'
import { AuthContext } from './navigation/AuthProvider';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'

export default function Playground(props) {
  const { user, setUser } = React.useContext(AuthContext);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState('');
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const containerRef = React.useRef();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: API_KEY,
            authDomain: AUTH_DOMAIN,
            databaseURL: DATABASE_URL,
            projectId: PROJECT_ID,
            storageBucket: STORAGE_BUCKET,
            messagingSenderId: MESSAGING_SENDING_ID,
            appId: APP_ID,
            measurementId: MEASUREMENT_ID
          });
        }

        firebase.auth().onAuthStateChanged((userUpdate) => {
          setUser(userUpdate);
        });

        SplashScreen.preventAutoHide();

        // Load our initial navigation state

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
    INITIAL_ROUTE_NAME = 'Playground';
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Root>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer ref={containerRef}>
            {user ? <AppDrawer/> : <LoginStack/>}
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