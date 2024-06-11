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
import CustomLink from '@/components/Buttons/CustomLink';
import { FontAwesome } from '@expo/vector-icons';


export default function SelectionScreen() {
	const router = useRouter();
	const animation = useFadeInStyles(50, 50, 800, 0)

	return (
		<CustomSafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				<Animated.View style={animation.fadeInStyle}>
					<CustomLink
						onPress={() => { router.back() }}
						onLongPress={() => { }}
						title={''}
						iconLeft={null}
						iconRight={<FontAwesome name="chevron-left" style={[text.black, text.icon, container.back_button]} />}
						iconRightStyle={{}}
						style={container.back_button}
						textStyle={{}}
						disabled={false}
						loading={false} />
				</Animated.View>

				{/* Logo */}
				<Animated.View style={[container.logo, animation.fadeInStyle]}>
					<BoldText style={[text.black, text.largest]}>
						GYM/<SemiBoldText style={text.yellow}>HUB</SemiBoldText>
					</BoldText>
				</Animated.View>

				{/* Bottom Buttons */}
				<Animated.View style={[container.bottom, animation.slideUpStyle]}>
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