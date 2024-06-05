// Node Modules
import React, { useState } from 'react';
import { SafeAreaView, View, TextInput } from 'react-native'
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { CustomSafeAreaView, HorizontalPaddedView } from '@/components/Views/PaddedView'
import { BoldText } from '@/components/Text/StyledText';
import { IconPressable } from '@/components/Buttons/CustomPressable';
import CustomLink from '@/components/Buttons/CustomLink';
import LoginForm from '@/components/Forms/LoginForm';
import Animated from 'react-native-reanimated';




export default function LoginScreen() {
	const router = useRouter();
	const { fadeInStyle, slideUpStyle, slideLeftStyle } = useFadeInStyles(50, 50, 800)

	return (
		<>
			<CustomSafeAreaView style={[container.wrapper, container.bg_white]}>
				<HorizontalPaddedView>
					{/* Back Button */}
					<IconPressable
						style={[container.back_button, text.black, text.icon]}
						icon={'chevron-left'}
						onPress={() => router.back()}
					></IconPressable>

					{/* Header */}
					<Animated.View style={[container.header, slideLeftStyle]}>
						<BoldText style={[text.large, text.black]}>{'Welcome\nBack!'}</BoldText>
					</Animated.View>

					{/* Form */}
					<LoginForm />

					{/* Recover Password */}
					<Animated.View style={slideUpStyle}>
						<CustomLink
							loading={false}
							onPress={() => { router.push('RecoverPasswordModalScreen') }}
							onLongPress={() => { }}
							title="Forgot your password?"
							iconLeft={''}
							iconRight={''}
							iconRightStyle={{}}
							style={{ alignSelf: 'center', marginBottom: 0 }}
							textStyle={text.option_link}
							disabled={false}
						/>
					</Animated.View>
				</HorizontalPaddedView>
			</CustomSafeAreaView>

		</>


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