import React from 'react';
import { Text, TextProps } from '../Themed';

// Custom text components already predefined with  specific fonts

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function MediumText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Montserrat_Medium' }]} />;
}

export function SemiBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Montserrat_SemiBold' }]} />;
}

export function BoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Montserrat_Bold' }]} />;
}

export function ExtraBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Montserrat_ExtraBold' }]} />;
}
