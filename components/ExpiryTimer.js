import * as React from 'react';
import { Text } from 'react-native'
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function ExpiryTimer(props) {
  const [remainingSecs, setRemainingSecs] = React.useState(props.setTime);
  const [isActive, setIsActive] = React.useState(true);
  const { mins, secs } = getRemaining(remainingSecs);

  React.useEffect(() => {
    let interval = null;
    if (isActive && remainingSecs > 0) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs - 1);
      }, 1000);
    } else if (remainingSecs <= 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });


  return (
	<Text style={{fontSize: 17, color: "#757E90"}}>{`${mins}:${secs}`}</Text>
  );
}