// Node Modules
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Animated from 'react-native-reanimated';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native';
import { text } from '@/styles/text.styles';
import { container } from '@/styles/containers.styles';
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { HorizontalPaddedView } from '@/components/Views/PaddedView';
import { BoldText } from '@/components/Text/StyledText';
import { IconPressable } from '@/components/Buttons/CustomPressable';
import SetupProfileForm from '@/components/Forms/SetupProfileForm';


export default function SetupProfileScreen() {
	const { slideUpStyle, fadeInStyle, slideLeftStyle } = useFadeInStyles(50, 50, 800)

	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				{/* Back Button */}
				<IconPressable
					style={[container.back_button, text.white, text.icon]}
					icon={'chevron-left'}
					onPress={() => { }}
				></IconPressable>

				{/* Header */}
				<Animated.View style={[container.header, { marginBottom: 10 }, slideLeftStyle]}>
					<BoldText style={[text.large, text.black]}>{'Setup\nProfile.'}</BoldText>
				</Animated.View>

				{/* Form */}
				<SetupProfileForm />


			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	side_buttons: {
		justifyContent: 'space-between'
	},
	side_button: {
		backgroundColor: 'rgba(231, 190, 96, .12)',
		borderStyle: 'solid',
		borderColor: '#e7be60',
		borderWidth: 1,
	},
	brand_icon: {
		paddingRight: 4,
		paddingTop: 3,
		backgroundColor: 'transparent'
	}
})