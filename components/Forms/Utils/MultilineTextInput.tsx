import { container } from '@/styles/containers.styles';
import { text } from '@/styles/text.styles';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextInputProps } from './DisplayNameInput';


export default function MultilineTextInput({ 
	value, 
	setValue, 
	setBlur, 
	placeholder, 
	containerStyle, 
	inputStyle, 
	iconStyle 
}: TextInputProps) {
	return (
		<View style={[containerStyle, container.flex_x, text.light_grey]}>
			{/* </Pressable> */}
			<TextInput
				multiline
				style={[inputStyle, { paddingHorizontal: 10}]}
				placeholderTextColor={'#818181'}
				placeholder={placeholder}
				value={value}
				onChangeText={setValue}
				onBlur={setBlur}
			/>
		</View>
	)
}
