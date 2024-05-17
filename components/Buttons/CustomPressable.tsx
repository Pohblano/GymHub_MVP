// Modules
import React, { useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable as RNPressable } from 'react-native';

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

// Animation icon button
export function IconPressable({ style, icon, size, activeOpacity, onPress, ...otherProps }) {

  const _style = useCallback(
    ({ pressed }) => [
      {
        opacity: (pressed ? activeOpacity : 1),
        transform: (pressed ? [{ scale: 0.99 }] : ''),
      }, style && style],
    [style]
  );

  return (
    <RNPressable style={_style} {...otherProps}>
      <FontAwesome 
        name={icon}
        size={size}
        style={style}
        onPress={onPress}
        />
    </RNPressable>
  );
}


