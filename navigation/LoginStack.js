import * as React from 'react';
import { AsyncStorage } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from "../screens/LandingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import SetupUserScreen from '../screens/SetupUserCardScreen';
import firebaseSDK from '../server/fire';

const storePersistenceToken = async () => {
	try {
		/*TODO: has uid and create token*/
		await AsyncStorage.setItem('@Playground_token', 'CHANGE_THIS_TOKEN');
	} catch(e) {
		console.log("Could not create login token");
	}
}

const MyLoginStack = createStackNavigator();
function LoginStack(props) {
	return (
		<MyLoginStack.Navigator initialRoute={'Landing Page'}>
	      <MyLoginStack.Screen name="Landing Page" component={LandingScreen} options={{headerShown: false}}/>
	      <MyLoginStack.Screen name="Sign Up" options={{headerShown: false}}>
	      	{props => <SignUpScreen {...props} storePersistenceToken={storePersistenceToken} /> }
	      </MyLoginStack.Screen>
	      <MyLoginStack.Screen name="Sign In" options={{headerShown: false}}>
	      	{props => <SignInScreen {...props} storePersistenceToken={storePersistenceToken} /> }
	      </MyLoginStack.Screen>
	       <MyLoginStack.Screen name="Setup User" options={{headerShown: false}}>
	      	{props => <SetupUserScreen {...props} storePersistenceToken={storePersistenceToken} /> }
	      </MyLoginStack.Screen>
	    </MyLoginStack.Navigator>
	);
}
export default LoginStack;