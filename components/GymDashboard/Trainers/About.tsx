import React, { useState } from 'react'
import Animated, { EntryExitTransition, FadeIn } from 'react-native-reanimated'
import { View, Text } from 'react-native'
import ReadMore from 'react-native-read-more-text'
// Styles
import { text } from '@/styles/text.styles'
import { useFadeInStyles } from '@/hooks/animationStyle'
// Components
import { BoldText, MediumText, RegularText, SemiBoldText } from '@/components/Text/StyledText'
import DisplayStarRating from '@/components/Utils/DisplayStarRating'

// Context
import { useGym } from '@/context/Gym.context'
import { TrainerType } from './Trainers'


export default function About({ trainer }: {
	trainer: TrainerType
}) {
	const { gym } = useGym()
	const animation = useFadeInStyles(50, 50, 800,0)
	const delayedAnimation = useFadeInStyles(50, 50, 800, 200)
	const delayeddAnimation = useFadeInStyles(50, 50, 800, 400)

	const renderTruncatedFooter = (handlePress: () => any) => {
		return (
			<Text 
			style={{ color: '#528eff', marginTop: 5 }} 
			onPress={() => { handlePress(); }}>
				Read more
			</Text>
		)
	}

	const renderRevealedFooter = (handlePress: () => any) => {
		return (
			<Text
				style={{ color: '#528eff', marginTop: 5 }}
				onPress={() => { handlePress(); }}>
				Show less
			</Text>
		)
	}

	return (
		<Animated.View className='flex-1 d-flex'>

			<Animated.View className='d-flex' style={animation.slideUpStyle}>
				<BoldText className='mb-1' style={[text.large]}>{trainer.name}</BoldText>
				<RegularText style={[text.light_grey, text.regular]}>{trainer.specialty?.join(', ')}</RegularText>
			</Animated.View>

			<Animated.View className='d-flex' style={[{ marginTop: 40 }, delayedAnimation.slideUpStyle]} >
				<SemiBoldText className='mb-6' style={[text.regular, text.light_grey]}>{'Biography'}</SemiBoldText>
				<ReadMore	
					numberOfLines={4}
					renderTruncatedFooter={renderTruncatedFooter}
					renderRevealedFooter={renderRevealedFooter}>
					<MediumText style={[{ marginTop: 30 }, text.regular]}>
						{trainer.biography}
					</MediumText>
				</ReadMore>
			</Animated.View>

			{/* <Animated.View className='d-flex' style={{ marginTop: 40 }}>
				<SemiBoldText className='mb-3' style={[text.regular, text.light_grey]}>{'Client Ratings'}</SemiBoldText>
				<DisplayStarRating rating={0} style={{marginBottom: 20}} size={28}/>
				<SemiBoldText className='mb-3' style={[text.regular, text.light_grey]}>{`${''} Reviews`}</SemiBoldText>
			</Animated.View> */}



		</Animated.View>
	)
}
