import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default function LandingScreen(props) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>playground</Text>
			</View>
			<View style={styles.registrationContainer}>
				<TouchableOpacity onPress={() => props.navigation.navigate('Sign Up')}>
					<Text style={styles.registrationText}>join now</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => props.navigation.navigate('Sign In')}>
					<Text style={styles.loginText}>already have an account? sign in</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
} 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
	},
	titleContainer: {
		flex: 1,
		paddingVertical: '20%',
		alignItems: 'center',
	},
	titleText: {
		color: '#000000',
		fontFamily: "comfortaa-regular",
		fontSize: 40,
	},
	registrationContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingBottom: '12%',
		alignItems: 'center',
	},
	registrationText: {
		color: '#000000',
		fontFamily: "comfortaa-regular",
		padding: '10%',
		fontSize: 21,

	},
	loginText: {
		color: '#000000',
		fontFamily: "comfortaa-light",
		fontSize: 18,
	}
}) 