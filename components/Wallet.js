import * as React from 'react';
import { Text, SafeAreaView  } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { Toast } from 'native-base';
import { withBadge, Icon } from 'react-native-elements'

function Wallet({notification}) {
    const WalletBadge = withBadge()(Icon);
    return (
        <TouchableOpacity
        //TODO: Increase area for greater responsiveness
        style={{
            width: 30,
            height: 30,
            marginRight: 10
        }}
        onPress={() => Toast.show({
              text: "Hang tight! We're still putting this feature together...",
              buttonText: "Okay",
              duration: 2500,
              })}>
	        <SafeAreaView style={{alignSelf: "center"}}>
	            {notification ? <WalletBadge type={'ionicon'} name={'ios-card'} size={28} color={'#D8D8D8'}/>
                : <Ionicons name={'ios-card'} size={28} color={'#D8D8D8'} /> }
	        </SafeAreaView>
        </TouchableOpacity>
    );
}
export default Wallet;