// Modules
import React from 'react'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import { ScrollView } from 'react-native'
// Components
import GymHeroBanner from './Utils/GymHeroBanner'
import { useFadeInStyles } from '@/hooks/animationStyle'
// Context
import { useGym } from '@/context/Gym.context'


function Home() {
	const { gym } = useGym()
	const images = gym.images

	return (
		<ScrollView>
			<Animated.View className='flex-1 mb-3' entering={FadeInDown.duration(600).withInitialValues({transform: [{ translateY: 50 }]})}>
				<GymHeroBanner
					title={'Promotions'}
					subtitle='Our latest'
					details=''
					image={images?.promotions}
					href='/help'
					textAnimation={FadeInRight.duration(800).delay(200)}
					linkAnimation={FadeInRight.duration(800).delay(400)} />
			</Animated.View>

			<Animated.View className='flex-1' entering={FadeInDown.duration(800).delay(200).withInitialValues({transform: [{ translateY: 50 }]})}>
				<GymHeroBanner
					title={'Memberships'}
					subtitle='All access'
					details=''
					image={images?.memberships}
					href='/help'
					textAnimation={FadeInRight.duration(800).delay(500)}
					linkAnimation={FadeInRight.duration(800).delay(700)} />
			</Animated.View>
		</ScrollView>
	)
}

export default Home
