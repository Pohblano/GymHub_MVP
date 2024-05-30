import React from "react";
import { View as DefaultView, Text as DefaultText } from 'react-native';
import { ViewProps } from '../Themed'


// Horizontal padding wrapper for screens
export function HorizontalPaddedView(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;

	return <DefaultView style={[{ maxWidth: 500, paddingHorizontal: 20, flex: 1, display: 'flex'}, style]} {...otherProps} />;
}

export function Seperator_Text({children, style}) {
	return (
		<DefaultView style={{ flexDirection: 'row', alignItems: 'center' }}>
			<DefaultView style={{ flex: 1, height: 1, backgroundColor: '#454545' }} />
			<DefaultView>
				<DefaultText style={[{ textAlign: 'center', marginHorizontal: 12, fontSize: 12, fontWeight: 'semibold' }, style]}>{children}</DefaultText>
			</DefaultView>
			<DefaultView style={{ flex: 1, height: 1, backgroundColor: '#454545' }} />
		</DefaultView>
	)
}

export function Seperator({style}){
	return(
		<DefaultView style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
			<DefaultView style={{ flex: 1, height: 1, backgroundColor: '#d6d6d6' }} />
		</DefaultView>
	)
}