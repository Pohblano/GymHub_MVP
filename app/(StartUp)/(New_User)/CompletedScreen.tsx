// Node Modules
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import LottieView from 'lottie-react-native';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles';
import { container } from '@/styles/containers.styles';
import confetti from '@/assets/lottie/confetti.json'
import checkmark from '@/assets/lottie/confetti.json'
// Components
import { HorizontalPaddedView } from '../../../components/Views/PaddedView'
import { BoldText } from '../../../components/Text/StyledText';
import { IconPressable } from '../../../components/Buttons/CustomPressable';
import CustomButton from '@/components/Buttons/CustomButton';



export default function SignupScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				{/* Back Button */}
				<IconPressable
					style={[container.back_button, text.white, text.icon]}
					icon={'chevron-left'}
					onPress={() => router.back()}
				></IconPressable>

				{/* Header */}
				<View style={container.header}>
					<BoldText style={[text.large, text.black]}>{'Welcome\nto the Team!'}</BoldText>
				</View>

				{/* Form */}
				<View style={[container.form, {}]}>
				<LottieView style={{ }} source={confetti} autoPlay />
				<LottieView style={{ }} source={checkmark} autoPlay />

				</View>
				{/* Bottom Buttons */}
				<View style={[container.bottom, { gap: 10 }]}>
					<CustomButton
						loading={{}}
						onPress={()=>router.replace('../(Active_user)/DashboardScreen')}
						onLongPress={() => { }}
						title="Get Started"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						width={'100%'}
						style={container.bg_yellow}
						textStyle={[text.primary_button, text.white]}
						disabled={false}
					/>
				</View>

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