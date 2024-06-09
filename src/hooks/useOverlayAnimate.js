import { useRef, useState } from "react";
import { Animated, Easing } from "react-native";

const useOverlayAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(false);

  const animateOverlay = () => {
    setProgress(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return {
    animateOverlay,
    progress,
    translateY,
  };
};

export default useOverlayAnimation;
