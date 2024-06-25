// Modules
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { useTranslation } from "react-i18next";
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ResizeMode, Video } from 'expo-av';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import CustomButton from '@/components/Buttons/CustomButton'
import { CustomSafeAreaView, HorizontalPaddedView } from '@/components/Views/PaddedView'
import { BoldText } from '@/components/Text/StyledText';
import CustomLink from '@/components/Buttons/CustomLink';
// Hooks
import { loadVideo } from '@/hooks/loadVideo';

export default function SelectionScreen() {
	const router = useRouter();
	const animation = useFadeInStyles(50, 50, 800, 0)
	const { t } = useTranslation();
	const { isVideoReady } = loadVideo(require('@/assets/videos/selection.mp4'))
	return (
		<>

			<CustomSafeAreaView style={[container.wrapper, { backgroundColor: 'black' }]}>
				{isVideoReady && (
					<Animated.View entering={FadeIn.duration(400)} style={{ backgroundColor: 'black' }}>
						<Video
							source={require('@/assets/videos/selection.mp4')} // Replace with your video URL
							rate={1.0}
							volume={1.0}
							isMuted={false}
							resizeMode={ResizeMode.COVER}
							shouldPlay
							isLooping
							style={styles.video} />
					</Animated.View>
				)}

				<HorizontalPaddedView>
					<Animated.View style={animation.fadeInStyle}>
						<CustomLink
							onPress={() => { router.back() }}
							onLongPress={() => { }}
							title={''}
							iconLeft={null}
							iconRight={<FontAwesome name="chevron-left" style={[text.white, text.icon, container.back_button]} />}
							iconRightStyle={{}}
							style={container.back_button}
							textStyle={{}}
							disabled={false}
							loading={false} />
					</Animated.View>

					{/* Logo */}
					<Animated.View style={[container.logo, animation.fadeInStyle]}>
						<BoldText style={[text.white, text.largest, text.logo_shadow]}>
							GYM/<BoldText style={text.yellow}>HUB</BoldText>
						</BoldText>
					</Animated.View>

					{/* Bottom Buttons */}
					<Animated.View style={[container.bottom, animation.slideUpStyle]}>
						<CustomButton
							loading={false}
							onPress={() => { router.push('LoginScreen') }}
							onLongPress={() => { }}
							title={t('Log In')}
							iconLeft={''}
							iconRight={''}
							activeOpacity={0.8}
							width={'100%'}
							style={container.bg_white}
							textStyle={[text.primary_button, text.black]}
							disabled={false}
						/>
						<CustomButton
							loading={false}
							onPress={() => { router.push('SignupScreen') }}
							onLongPress={() => { }}
							title={t("Sign Up")}
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

		</>
	)
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	video: {
		width: width,
		height: height + 10,
		position: 'absolute',
		top: 0,
		left: 0,
	},
})	