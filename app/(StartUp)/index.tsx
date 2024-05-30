// Node Modules
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// * Routing
import { useRouter } from 'expo-router';
// *Styling
import { StyleSheet } from 'react-native'
import { text } from '../../styles/text.styles'
import { container } from '../../styles/containers.styles'

// Components
import CustomButton from '../../components/Buttons/CustomButton'
import { HorizontalPaddedView } from '../../components/Views/PaddedView'
import { BoldText, MediumText, SemiBoldText } from '../../components/Text/StyledText';
import PageLoading from '@/components/Loading/PageLoading';


export default function StartUpScreen() {
	const router = useRouter()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}, []);

	return (
		<>
			{loading ?
				<PageLoading />
				:
				<SafeAreaView style={[container.bg_yellow, container.wrapper]}>
					<HorizontalPaddedView>
						
						{/* Logo */}
						<Animated.View entering={FadeInUp} style={container.logo}>
							<BoldText style={[text.white, text.largest]}>
								GYM/<SemiBoldText style={text.black}>HUB</SemiBoldText>
							</BoldText>
						</Animated.View>

						{/* Bottom Text */}
						<Animated.View entering={FadeInDown} style={container.bottom}>
							<MediumText style={[text.white, text.small]}>
								{'Join the \n'}
								<MediumText style={[text.white, text.large]}>{'Online Gym Community'}</MediumText>
							</MediumText>
							<CustomButton
								loading={false}
								onPress={() => router.push('SelectionScreen')}
								onLongPress={() => { }}
								title="Get Started"
								iconLeft={''}
								iconRight={''}
								activeOpacity={0.8}
								width={'100%'}
								style={container.bg_white}
								textStyle={[text.black, text.primary_button]}
								disabled={false}
							/>
						</Animated.View>
					</HorizontalPaddedView>
				</SafeAreaView>
			}
		</>
	)
}

const styles = StyleSheet.create({



})