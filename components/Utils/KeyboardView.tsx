import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

const ios = Platform.OS == 'ios'
export default function KeyBoardView({ children,containerStyle, scrollStyle, contentContainerStyle }) {
	return (
		<KeyboardAvoidingView
			behavior={ios ? 'padding' : undefined}
			style={[containerStyle]}
			keyboardVerticalOffset={50}
			>
			<ScrollView
				style={scrollStyle}
				contentContainerStyle={contentContainerStyle}
				bounces={false}
				showsVerticalScrollIndicator={false}>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}