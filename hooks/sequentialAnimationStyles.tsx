import { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS, withDelay } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

export const useSequentialSlideInStyles = (initialTranslateY = 50, duration = 800, delay = 200, childDelay = 200) => {
	const translateY = useSharedValue(initialTranslateY);
	const opacity = useSharedValue(0);
	const childOpacity = useSharedValue(0);
	const childTranslateY = useSharedValue(50);
	const childTranslateX = useSharedValue(50);

	const startAnimation = (index: number,  onComplete: () => void) => {
		const effectiveDelay = index * (delay);

		opacity.value = withDelay(effectiveDelay, withTiming(1, { duration }))
		translateY.value = withDelay(effectiveDelay, withTiming(0, { duration }, () => {
			runOnJS(onComplete)();
		}))
		// Start child animations slightly after the parent animation
		const childEffectiveDelay = childDelay;
		childTranslateY.value = withDelay(childEffectiveDelay, withTiming(0, { duration }))
		childTranslateX.value = withDelay(childEffectiveDelay, withTiming(0, { duration }))
		childOpacity.value = withDelay(childEffectiveDelay, withTiming(1, { duration }))
	};

	const resetAnimation = () => {
		translateY.value = withTiming(initialTranslateY, { duration: duration / 2 })
		opacity.value = withTiming(0, { duration: duration / 2 })

		// Child
		childTranslateY.value = withTiming(50, { duration: duration / 2 })
		childTranslateX.value = withTiming(50, { duration: duration / 2 })
		childOpacity.value = withTiming(0, { duration: duration / 2 })
	};

	const slideInStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
		opacity: opacity.value,
	}));

	const childSlideInStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: childTranslateY.value }],
		opacity: childOpacity.value,
	}));

	const childSlideInXStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: childTranslateX.value }],
		opacity: childOpacity.value,
	}));

	return { slideInStyle, childSlideInStyle, childSlideInXStyle, startAnimation, resetAnimation };
};

export const sequentialStyles = (array: any, initialTranslateY = 50, duration = 1000, delay = 200, childDelay = 200) => {
	const elements = array.map(() => useSequentialSlideInStyles(initialTranslateY, duration, delay, childDelay));

	const startSequentialAnimation = () => {
		const animateElement = (index: number) => {
			if (index < elements.length) {
				elements[index].startAnimation(index, () => animateElement(index + 1));
			}
		};
		animateElement(0);
	};

	useFocusEffect(
		React.useCallback(() => {
			startSequentialAnimation();

			// return () => {
			// 	elements.forEach((el: { resetAnimation: () => any; }) => el.resetAnimation());
			// };
		}, [elements])
	);

	return elements
}

