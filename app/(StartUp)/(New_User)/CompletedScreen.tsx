// Node Modules
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '@/styles/text.styles';
import { container } from '@/styles/containers.styles';
import checkmark from '@/assets/lottie/checkmark.json'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { CustomSafeAreaView, HorizontalPaddedView } from '../../../components/Views/PaddedView'
import { BoldText } from '../../../components/Text/StyledText';
import { IconPressable } from '../../../components/Buttons/CustomPressable';
import CustomButton from '@/components/Buttons/CustomButton';
import Animated from 'react-native-reanimated';

import CustomLink from '@/components/Buttons/CustomLink';




export default function CompletedScreen() {
	const router = useRouter();
	const animation = useFadeInStyles(50, 50, 800, 0)
	return (
		<CustomSafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				{/* Back Button */}
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

				{/* Header */}
				<Animated.View style={[container.header, animation.slideLeftStyle]}>
					<BoldText style={[text.large, text.black]}>{'Welcome\nto the Team!'}</BoldText>
				</Animated.View>

				{/* Form */}
				<View style={[ { flex: 2, position: 'relative'}]}>
				<LottieView style={{height: 250}} source={checkmark} resizeMode='contain' autoPlay />

				</View>
				{/* Bottom Buttons */}
				<Animated.View style={[container.bottom, { gap: 10 }, animation.slideUpStyle]}>
					<CustomButton
						loading={false}
						onPress={()=>router.replace('(Drawer)/GymDashboardScreen')}
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
				</Animated.View>

			</HorizontalPaddedView>
		</CustomSafeAreaView>
	)
}

const styles = StyleSheet.create({
	lottie_check: {
		height: 200, 
		position: 'relative', 
		bottom: 250,
		// top: 100

	}
})