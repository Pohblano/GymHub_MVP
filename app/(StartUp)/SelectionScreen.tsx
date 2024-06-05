// Node Modules
import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native'
// * Routing
import { useFocusEffect, useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '../../styles/text.styles'
import { container } from '../../styles/containers.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import CustomButton from '../../components/Buttons/CustomButton'
import { CustomSafeAreaView, HorizontalPaddedView } from '../../components/Views/PaddedView'
import { BoldText, SemiBoldText } from '../../components/Text/StyledText';
import { IconPressable } from '../../components/Buttons/CustomPressable';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';



export default function SelectionScreen() {
	const router = useRouter();
	const { fadeInStyle, slideUpStyle } = useFadeInStyles(50, 50, 800)

	return (
		<CustomSafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				<IconPressable
					style={[container.back_button, text.black, text.icon]}
					icon={'chevron-left'}
					onPress={() => router.back()}
				></IconPressable>

				{/* Logo */}
				<Animated.View style={[container.logo, fadeInStyle]}>
					<BoldText style={[text.black, text.largest]}>
						GYM/<SemiBoldText style={text.yellow}>HUB</SemiBoldText>
					</BoldText>
				</Animated.View>

				{/* Bottom Buttons */}
				<Animated.View style={[container.bottom, slideUpStyle]}>
					<CustomButton
						loading={false}
						onPress={() => { router.push('(Active_User)/LoginScreen') }}
						onLongPress={() => { }}
						title="Log In"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						width={'100%'}
						style={container.bg_black}
						textStyle={[text.primary_button, text.white]}
						disabled={false}
					/>
					<CustomButton
						loading={false}
						onPress={() => { router.push('(New_User)/SignupScreen') }}
						onLongPress={() => { }}
						title="Sign Up"
						iconLeft={''}
						iconRight={''}
						activeOpacity={0.8}
						width={'100%'}
						style={container.bg_yellow}
						textStyle={[text.primary_button, text.white]}
						disabled={false}
					/>
				</Animated.View>
			</HorizontalPaddedView>
		</CustomSafeAreaView>
	)
}

const styles = StyleSheet.create({

})