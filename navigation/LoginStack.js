import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from "../screens/LandingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";

const MyLoginStack = createStackNavigator();
function LoginStack(props) {
	return (
		<MyLoginStack.Navigator initialRoute={'Landing Page'}>
	      <MyLoginStack.Screen name="Landing Page" component={LandingScreen} options={{headerShown: false}}/>
	      <MyLoginStack.Screen name="Sign Up" component={SignUpScreen} options={{headerShown: false}} />
	      <MyLoginStack.Screen name="Sign In" component={SignInScreen} options={{headerShown: false}} />
	    </MyLoginStack.Navigator>
	);
}
export default LoginStack;