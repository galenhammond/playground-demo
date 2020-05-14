import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import CustomDrawerHeader  from "./components/DrawerHeader";
import useLinking from './navigation/useLinking';
import { VisbilitySwitch } from './components/VisibilitySwitch'
import HamburgerIcon from "./navigation/HamburgerMenu";
import SettingsScreen from "./screens/SettingsScreen"

const Drawer = createDrawerNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
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
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Drawer.Navigator drawerContent={props => <CustomDrawerHeader {...props} 
          image={require('./assets/images/MichelleThumb.jpg')} 
          name="Michelle" />} >
            <Drawer.Screen name="Feed" component={BottomTabNavigator} options={{swipeEnabled: false}} />
            <Drawer.Screen name="Settings" component={SettingsStack} options={{swipeEnabled: false}} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const MySettingsStack = createStackNavigator();
function SettingsStack({navigation}) {
  return (
    <MySettingsStack.Navigator screenOptions={{headerShown: true,
     headerTitle: "playground",
     headerStyle: {height: 65, borderBottomWidth: 0.5},
     headerTitleStyle: { fontFamily: 'comfortaa-regular', fontSize: 21,
     textAlign: 'center', alignSelf: 'center'},
     headerLeft: props => <HamburgerIcon {...navigation} /> 
   }}>
      <MySettingsStack.Screen name="Settings" component={SettingsScreen}/>
    </MySettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
