import React, { Dispatch, SetStateAction, useState } from 'react'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import { View, Text, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
// Styles
import { text } from '@/styles/text.styles'
import { useFadeInStyles } from '@/hooks/animationStyle'
// Components
import LargeImageSlider from '@/components/Utils/LargeImageSlider'
import { BoldText, MediumText } from '@/components/Text/StyledText'
import { GymAllEquipment, GymAmenities, GymBiography } from './Utils/Stateless'
import { Seperator } from '@/components/Views/PaddedView'
import GymDisplayImage from './Utils/GymDisplayImage'
import GymLocation from './Utils/GymLocation'
import GymReviews from './Utils/GymReviews'
// Context
import { useGym } from '@/context/Gym.context'
import ScheduleStatus from '@/components/Utils/ScheduleStatus'


export default function About() {
	const { gym, reviews } = useGym()
	const images = gym.images
	const animation = useFadeInStyles(50, 50, 800, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 500, 400)

	return (
		<ScrollView showsVerticalScrollIndicator={false} style={{}}>
			<View className='flex-1 d-flex'>
				{/* Carousel */}
				<Animated.View entering={FadeInDown.duration(800)}>
					<LargeImageSlider images={images} />
				</Animated.View>

				<View>

					<BoldText style={[text.largest, { marginTop: 20 }, delayedAnimation.slideLeftStyle]}>{gym.name}</BoldText>

					<Animated.View style={delayedAnimation.slideLeftStyle} className='d-flex flex-row mt-2'>
						<ScheduleStatus schedule={gym.schedule} business={'The gym'} subtitle='is open'  />
					</Animated.View>

					<Animated.View style={animation.fadeInStyle}>
						<Seperator style={{ marginTop: 30 }} />
					</Animated.View>


					<Animated.View entering={FadeInDown.duration(800).delay(200)}>
						<GymBiography bio={gym.biography} />
					</Animated.View>

					<Animated.View style={animation.fadeInStyle}>
						<Seperator style={{ marginTop: 30 }} />
					</Animated.View>

					<Animated.View entering={FadeInDown.duration(800).delay(400)}>
						<GymAllEquipment list={gym.equipment} />
					</Animated.View>

					<Animated.View entering={FadeInDown.duration(800).delay(600)}>
						<GymDisplayImage image={images.gym_display_image} caption={'Join \nthe Family'} />
					</Animated.View>

					<Animated.View entering={FadeInDown.duration(800).delay(800)}>
						<GymAmenities list={gym.amenities} />
					</Animated.View>


					<Animated.View style={animation.fadeInStyle}>
						<Seperator style={{ marginTop: 30 }} />
					</Animated.View>


					<Animated.View entering={FadeInDown.duration(800).delay(1000)}>
						<GymLocation address={gym.address} />
					</Animated.View>

					<Animated.View style={animation.fadeInStyle}>
						<Seperator style={{ marginTop: 30 }} />
					</Animated.View>


					<Animated.View entering={FadeInDown.duration(800).delay(1200)}>
						<GymReviews rating={gym.rating} reviews={reviews} />
					</Animated.View>

				</View>


			</View>
		</ScrollView>
	)
}
