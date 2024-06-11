import React from 'react';
import { Text, TextProps } from '../Themed';
import Animated, { BaseAnimationBuilder, EntryExitAnimationFunction } from 'react-native-reanimated';
import { ReanimatedKeyframe } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';

// Custom text components already predefined with  specific fonts
export function MonoText(props: TextProps, {entering}:{entering:any}) {
  return <Animated.Text {...props} entering={entering} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function LightText(props: TextProps, {entering}:{entering:any}) {
  return <Animated.Text {...props} entering={entering} style={[props.style, { fontFamily: 'Montserrat_Light' }]} />;
}

export function RegularText(props: TextProps, {entering}:{entering:any}) {
  return <Animated.Text {...props} entering={entering} style={[props.style, { fontFamily: 'Montserrat_Regular' }]} />;
}

export function MediumText(props: TextProps, {entering}:{entering:any}) {
  return <Animated.Text {...props} entering={entering} style={[props.style, { fontFamily: 'Montserrat_Medium' }]} />;
}

export function SemiBoldText(props: TextProps, {entering}:{entering:any}) {
  return <Animated.Text {...props} entering={entering} style={[props.style, { fontFamily: 'Montserrat_SemiBold' }]} />;
}

export function BoldText(props: TextProps, {entering}:{entering:any}) {
  return <Animated.Text {...props} entering={entering} style={[props.style, { fontFamily: 'Montserrat_Bold' }]} />;
}

export function ExtraBoldText(props: TextProps, {entering}:{entering:any}) {
  return <Animated.Text {...props} entering={entering} style={[props.style, { fontFamily: 'Montserrat_ExtraBold' }]} />;
}
