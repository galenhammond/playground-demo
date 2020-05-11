import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Badge } from 'react-native-elements'

//TODO: Slidable message list

const Message = ({ image, lastMessage, name, timeStamp, opened}) => {
  return (
    <View style={styles.containerMessage}>
      { opened && <Badge status="primary" containerStyle={{ position: 'absolute', left: '1.7%' }} /> }
      <Image source={image} style={styles.avatar} />
      <View>
        <Text>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
      <Text style={styles.timestamp}>{timeStamp}</Text>
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
		paddingHorizontal: 20,
		width: "100%",
		borderBottomWidth: 0.3,
		borderColor: "#D8D8D8"
	},
	avatar: {
		borderRadius: 30,
		width: 40,
		height: 40,
		marginRight: 20,
		marginVertical: 15
	},
	message: {
		color: "#757E90",
		fontSize: 12,
		paddingTop: 5
	},
	timestamp: {
		flex: 1,
		textAlign: "right",
		color: "#757E90",
		fontSize: 12,
	}

});

export default Message;