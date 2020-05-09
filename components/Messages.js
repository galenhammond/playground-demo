import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

const DIMENSION_WIDTH = Dimensions.get("window").width;

const Message = ({ image, lastMessage, name }) => {
  return (
    <View style={styles.containerMessage}>
      <Image source={image} style={styles.avatar} />
      <View>
        <Text>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
	// COMPONENT - MESSAGE
	containerMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 10,
		width: "100%",
		borderBottomWidth: 0.3,
		borderColor: "#D8D8D8"
	},
	avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
	},
	message: {
		color: "#757E90",
		fontSize: 12,
		paddingTop: 5
	},

});

export default Message;