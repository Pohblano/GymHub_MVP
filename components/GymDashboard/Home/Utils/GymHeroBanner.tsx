// Modules
import React, { useState } from 'react'
import { StyleSheet, Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeIn } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
// Styling
import { text } from '@/styles/text.styles'
// Components
import { BoldText, LightText, MediumText, RegularText, SemiBoldText } from '../../../Text/StyledText'


function GymHeroBanner({ image, title, subtitle, details, textAnimation, linkAnimation, bodyContent, headerContent, bodyContentLength}: {
	image: string,
	title: string,
	subtitle: string,
	details: string,
	textAnimation?: any,
	linkAnimation?: any,
	headerContent: React.JSX.Element
	bodyContent: React.JSX.Element,
	bodyContentLength: number
}) {

	const [expanded, setExpanded] = useState(false);
	const contentHeight = useSharedValue(250)
	const toggleExpand = () => {
		setExpanded((prev) => !prev);
		const newHeight = (bodyContentLength > 1) ? 275 + bodyContentLength * 100 : 450 

		contentHeight.value = withTiming(expanded ? 250 : newHeight, {
			duration: 800,
		});
	};

	const animatedStyle = useAnimatedStyle(() => ({
		height: contentHeight.value
	}));

	return (
		<Pressable onPress={toggleExpand}>
			<Animated.View style={[animatedStyle,]} >
				<Image
					style={{ height: '100%', width: 'auto', borderRadius: 10 }}
					source={{ uri: image }} />
				<LinearGradient
					colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
					start={[0, 0]} end={[1, 0]}
					style={styles.background}>
					<Animated.View className='d-flex' style={{}} entering={textAnimation} layout={FadeIn.duration(1000)}>
						{expanded ?
							<>
								{headerContent}
							</>
							:
							<>
								<LightText style={[text.white, text.regular]}>
									{subtitle}
								</LightText>
								<BoldText className='w-full font-large' style={[text.large, text.white]}>
									{title}
								</BoldText>
							</>
						}
					</Animated.View>

					<Animated.View className='d-flex' layout={FadeIn.duration(1000)}>
						{expanded ?
							<>
								{bodyContent}
							</>
							:
							<Animated.View
								style={{}}
								entering={linkAnimation}>
								<SemiBoldText className='mb-2' style={[text.white, text.sub_heading]}>{details}</SemiBoldText>
								<RegularText style={[text.gym207, { width: '75%' }]}>
									{'Tap for more information'}
								</RegularText>
							</Animated.View>
						}
					</Animated.View>

				</LinearGradient>

			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		padding: 30,
		borderRadius: 10
	},

})

export default GymHeroBanner
