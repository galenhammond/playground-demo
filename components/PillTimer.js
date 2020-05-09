import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const SYSTEM_GREEN = '#30bf54'
const SYSTEM_YELLOW = '#ffcc00'
const SYSTEM_RED = '#ff3a30'

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export function PillTimer(props) {
	const [remainingSecs, setRemainingSecs] = React.useState(1201);
	const [isActive, setIsActive] = React.useState(true);
	const { mins, secs } = getRemaining(remainingSecs);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs - 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

	if (remainingSecs < 1200) {
		return (
			<View style={styles.containerRed}>
					<Text style={styles.pillTimerRed}>{`${mins}:${secs}`}</Text> 
			</View>
		)
	} else {
		return (
			<View style={styles.containerGreen}>
					<Text style={styles.pillTimerGreen}>{`${mins}:${secs}`}</Text> 
			</View>
		);
	}
}


const styles = StyleSheet.create({
	containerGreen: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: SYSTEM_GREEN,
	    paddingLeft: 4,
	    paddingRight: 4
	},
	containerRed: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: SYSTEM_RED,
	    paddingLeft: 4,
	    paddingRight: 4
	},
	pillTimerGreen: {
		color: SYSTEM_GREEN,
		fontFamily: "sfprodisplay-medium",
		fontSize: 12
	},
	pillTimerRed: {
		color: SYSTEM_RED,
		fontFamily: "sfprodisplay-medium",
		fontSize: 12
	}
});