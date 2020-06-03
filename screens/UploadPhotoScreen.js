import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import ImagePicker from 'expo-image-picker';

export default function UploadPhotoScreen(props) {
	return (
		<View style={styles.container}>
			<FlatList
		  	data={null}
		  	renderItem={({ item }) => (
		    	<View style={styles.imageSlot}>
      				<Image style={styles.imageThumbnail} source={{ uri: item.uri }} />
    			</View>
  			)}
 			numColumns={3}
  			keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageSlot: {
		flex: 1, 
		flexDirection: 'column',
		margin: 1,
		borderWidth: 0.3,
		borderColor: "#D8D8D8",
		borderRadius: 8
	},
	imageThumbnail: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    height: 100,
	 },
})