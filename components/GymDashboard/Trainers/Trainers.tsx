import React, { useEffect, useState } from 'react'
import Animated, { SlideInDown } from 'react-native-reanimated'
import {  ScrollView } from 'react-native'
// Components
import TrainerSpotlight from './Utils/TrainerSpotlight'
import TrainersList from './Utils/TrainersList'
// Context
import { useGym } from '@/context/Gym.context'


export interface TrainerType {
	uid?: string,
	name?: string,
	first_name?: string,
	last_name?: string,
	contact_info?: { 
		email?:string, 
		phone?: string
	}
	biography?: string,
	specialty?: [],
	rating?: number,
	img?: string,
	img_list?: [],
	schedule?: {},
	schedule_overview?: {
		days?: string,
		time?: string,
	},
	socials?: {
		tiktok?: string,
		instagram?: string,
		facebook?: string,
	},
	appointments?: []
}

export default function Trainers() {
	const [loading, setLoading] = useState(null)
	const { gym, trainers } = useGym()
	const trainerList = trainers.filter((trainer: TrainerType) => (trainer.uid !== gym.trainer_spotlight))
	const trainer_spotlight = trainers.find((trainer: TrainerType) => (trainer.uid === gym.trainer_spotlight))
	
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Animated.View className='flex-1 d-flex'>
				<TrainerSpotlight trainer={trainer_spotlight} />
				<TrainersList trainers={trainerList} />
			</Animated.View>
		</ScrollView>
	)
}
