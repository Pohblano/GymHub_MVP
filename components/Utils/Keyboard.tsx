import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const ios = Platform.OS == 'ios'
export default function CustomKeyBoardView({ children }) {
	return (
		<KeyboardAvoidingView
			behavior={ios ? 'padding' : 'height'}
			style={{ flex: 1 }}>
			<ScrollView
				style={{ flex: 1 }}
				bounces={false}
				showsVerticalScrollIndicator={false}>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}