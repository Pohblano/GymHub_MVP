// Modules
import React, { useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable as RNPressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { useFadeInStyles } from '@/hooks/animationStyle';


// Opacity and transformation changes upon press 
export function ButtonPressable({ children, style, activeOpacity, ...otherProps }) {

  const _style = useCallback(
    ({ pressed }) => [
      {
        opacity: (pressed ? activeOpacity : 1),
        transform: (pressed ? [{ scale: 0.98 }] : ''),
      }, style && style],
    [style]
  );

  return (
    <RNPressable style={_style} {...otherProps}>
      {children}
    </RNPressable>
  );
}

export function LinkPressable({ children, style, ...otherProps }) {
  const animation = useFadeInStyles(50, 50, 800,0)
  const _style = useCallback(
    ({ pressed }) => [
      {
        opacity: (pressed ? 0.5 : 1),
        transform: (pressed ? [{ scale: 0.99 }] : ''),
      }, style && style],
    [style]
  );

  return (
    <RNPressable style={_style} {...otherProps}>
      {children}
    </RNPressable>

  );
}

// Animation icon button
export function IconPressable({ style, icon, onPress, ...otherProps }) {
  const animation = useFadeInStyles(50, 50, 800,0)
  const _style = useCallback(
    ({ pressed }) => [
      {
        activeOpacity: 1,
        transform: (pressed ? [{ scale: 0.80 }] : ''),
      } && { alignSelf: 'baseline' }],
    [style]
  );

  return (
    <Animated.View style={animation.fadeInStyle}>
      <RNPressable style={_style} {...otherProps}>
        <FontAwesome
          name={icon}
          style={[style]}
          onPress={onPress}
        />
      </RNPressable>
    </Animated.View>
  );
}

