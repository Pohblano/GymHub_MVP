// Modules
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, SafeAreaView, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import { useTranslation } from "react-i18next";
import { Video } from 'expo-av';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '../../styles/text.styles'
import { container } from '../../styles/containers.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';

import intro from '@/assets/videos/intro.mp4'
// Components
import CustomButton from '../../components/Buttons/CustomButton'
import { CustomSafeAreaView, HorizontalPaddedView } from '../../components/Views/PaddedView'
import { BoldText, MediumText, SemiBoldText } from '../../components/Text/StyledText';
import PageLoading from '@/components/Loading/PageLoading';


export default function StartUpScreen() {
	const { t } = useTranslation();
	const router = useRouter()
	const [loading, setLoading] = useState(true)
	const animation = useFadeInStyles(50, 50, 800, 0)

	useEffect(() => {
		setLoading(false)
	}, []);

	return (
		<>
			{loading ?
				<PageLoading />
				:
				<>
					<Video
						source={intro} // Replace with your video URL
						rate={1.0}
						volume={1.0}
						isMuted={false}
						resizeMode='cover'
						shouldPlay
						isLooping
						style={styles.video}/>
						
					<CustomSafeAreaView style={[ container.wrapper]}>
						<HorizontalPaddedView>

							{/* Logo */}
							<Animated.View style={[container.logo, animation.fadeInStyle]}  >
								<BoldText style={[text.white, text.largest, text.logo_shadow]}>
									GYM/<BoldText style={text.yellow}>HUB</BoldText>
								</BoldText>
							</Animated.View>
							{/* Bottom Text */}
							<Animated.View entering={FadeInDown.duration(1000)} exiting={FadeOutUp.duration(1000)} style={container.bottom}>
								<MediumText style={[text.white, text.small]}>
									{t('Join the\n')}
									<MediumText style={[text.white, text.large]}>{t('Online Gym Community')}</MediumText>
								</MediumText>

								<CustomButton
									loading={false}
									onPress={() => router.push('SelectionScreen')}
									onLongPress={() => { }}
									title={t('Get Started')}
									iconLeft={''}
									iconRight={''}
									activeOpacity={0.8}
									width={'100%'}
									style={container.bg_yellow}
									textStyle={[text.black, text.primary_button]}
									disabled={false}
								/>
							</Animated.View>
						</HorizontalPaddedView>
					</CustomSafeAreaView>
				</>
			}
		</>
	)
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	video: {
		width: width,
		height: height+ 10,
		position: 'absolute',
		top: 0,
		left: 0,
	},

})