import { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS, withDelay } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';


export const useFadeInStyles = (initialTranslateX = 50, initialTranslateY = 50, duration = 1000, delay = 0) => {
  const translateY = useSharedValue(initialTranslateY);
  const translateX = useSharedValue(initialTranslateX);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1.5);

  useFocusEffect(
    React.useCallback(() => {
      translateY.value = withDelay(delay, withTiming(0, { duration }))
      translateX.value = withDelay(delay, withTiming(0, { duration }))
      opacity.value = withDelay(delay, withTiming(1, { duration: 1000 }))
      scale.value = withDelay(delay, withTiming(1, { duration }))


      return () => {
        translateY.value = withTiming(initialTranslateY, { duration: duration / 2 });
        translateX.value = withTiming(initialTranslateX, { duration: duration / 2 });
        opacity.value = withTiming(0, { duration: duration / 2 });
        scale.value = withTiming(1.5, { duration: duration / 2 });
      };
    }, [initialTranslateY, initialTranslateX, duration])
  );


  const slideUpStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const slideLeftStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const fadeInStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const scaleInStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));


  return { fadeInStyle, slideUpStyle, slideLeftStyle, scaleInStyle };
};


