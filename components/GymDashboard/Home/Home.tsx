// Modules
import React from 'react'
import Animated from 'react-native-reanimated'
// Styles
import { container } from '@/styles/containers.styles'
import { text } from '@/styles/text.styles'

// Components
import GymHeroBanner from './Utils/GymHeroBanner'
import CustomButton from '@/components/Buttons/CustomButton'
// Context
import { useGym } from '@/context/Gym.context'
import { ScrollView } from 'react-native'


function Home({ logout }: {
	logout: () => void,
}) {
	const { gym } = useGym()
	const images = gym.images

	return (
		<ScrollView>
			<Animated.View className=' flex-1'>

				<GymHeroBanner
					caption={gym?.hero_banner?.caption}
					image={images?.hero_banner}
				/>


			</Animated.View>
		</ScrollView>
	)
}

export default Home