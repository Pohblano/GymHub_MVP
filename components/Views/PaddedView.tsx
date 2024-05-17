import React from "react";
import { View as DefaultView } from 'react-native';
import {ViewProps} from '../Themed'


// Horizontal padding wrapper for screens
export function HorizontalPaddedView(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
  
	return <DefaultView style={[{ paddingHorizontal: 20, flex:1 }, style]} {...otherProps} />;
  }
  