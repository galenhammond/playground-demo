import * as React from 'react';
import { Text, SafeAreaView  } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { withBadge, Icon } from 'react-native-elements'

function Wallet(props) {
    const WalletBadge = withBadge()(Icon);
    return (
        <TouchableOpacity
        //TODO: Increase area for greater responsiveness
        style={{
            width: 30,
            height: 30,
            marginRight: 10
        }}>
	        <SafeAreaView style={{alignSelf: "center"}}>
	             <WalletBadge type={'ionicon'} name={'ios-card'} size={28} color={'#D8D8D8'}/>
	        </SafeAreaView>
        </TouchableOpacity>
    );
}
export default Wallet;