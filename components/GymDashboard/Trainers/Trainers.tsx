import React, { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'
import { View, Text, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
// Styles
import { container } from '@/styles/containers.styles'
import { text } from '@/styles/text.styles'
// Components
import LargeImageSlider from '@/components/Utils/LargeImageSlider'
import { BoldText, MediumText } from '@/components/Text/StyledText'
import DisplayStarRating from '@/components/Utils/DisplayStarRating'
import { Seperator } from '@/components/Views/PaddedView'
import TrainerSpotlight from './Utils/TrainerSpotlight'
import TrainersList from './Utils/TrainersList'
// Context
import { useGym } from '@/context/Gym.context'

export interface TrainerType {
	uid?: string,
	name?: string,
	first_name?: string,
	last_name?: string,
	specialty?: string[],
	rating?: number,
	img?: string,
}

export default function Trainers() {
	const [loading, setLoading] = useState(null)
	const { gym, trainers } = useGym()
	const images = gym.images
	const trainerList = trainers.filter((trainer: TrainerType) => (trainer.uid !== gym.trainer_spotlight))
	const spotlight_trainer = trainers.find((trainer: TrainerType) => trainer.uid === gym.spotlight_trainer)


	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Animated.View className='flex-1 d-flex'>
				<TrainerSpotlight trainer={{ name: 'Stephen' }} />
				<TrainersList trainers={trainerList} />
			</Animated.View>
		</ScrollView>
	)
}
