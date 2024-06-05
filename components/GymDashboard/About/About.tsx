import React, { Dispatch, SetStateAction, useState } from 'react'
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
import { GymAllEquipment, GymAmenities, GymBiography } from './Utils/Stateless'
import { Seperator } from '@/components/Views/PaddedView'
import GymDisplayImage from './Utils/GymDisplayImage'
import GymLocation from './Utils/GymLocation'
import GymReviews from './Utils/GymReviews'
// Context
import { useGym } from '@/context/Gym.context'


export default function About() {
	const { gym, reviews } = useGym()
	const images = gym.images
	const [distance, setDistance] = useState(null);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Animated.View className='flex-1 d-flex'>

				{/* Carousel */}
				<LargeImageSlider images={images} />

				<View>
					{/* Header */}
					<BoldText style={{}} className='text-5xl mt-5'>{gym.name}</BoldText>

					{/* Quick Info */}
					<View className='d-flex flex-row mt-2'>
						{/* Calculate distance of you from the actual gym */}
						<MediumText style={text.light_grey}>
							{`${distance}km away`}
						</MediumText>
						<FontAwesome style={{ color: '#d6d6d6' }} className='align-sub text-sm ml-4' name={'circle'} />
						<View className='d-flex flex-row ml-4'>
							<MediumText style={text.light_grey} className='mr-1'>{gym.rating}
							</MediumText>
							<FontAwesome name="star" size={16} color="#ffd700" />
							<MediumText style={text.light_grey} className='ml-1'>{`(${gym.reviews.length} Reviews)`}
							</MediumText>
						</View>
						<FontAwesome style={{ color: '#d6d6d6' }} className='align-sub text-sm ml-4' name={'circle'} />
						<MediumText style={text.light_grey} className='ml-3'>{gym.price}
						</MediumText>
					</View>

					<Seperator style={{ marginTop: 30 }} />

					{/* Biography */}
					<GymBiography bio={gym.biography} />

					<Seperator style={{ marginTop: 30 }} />

					{/* Equipment Offered */}
					<GymAllEquipment list={gym.equipment} />

					{/* Display Image */}
					<GymDisplayImage image={images.gym_display_image} caption={'Join \nthe Family'} />

					{/* Amenities Offered */}
					<GymAmenities list={gym.amenities} />

					<Seperator style={{ marginTop: 30 }} />

					{/* Location of Gym */}
					<GymLocation address={gym.address} setDistance={setDistance} />

					<Seperator style={{ marginTop: 30 }} />

					{/* Google Reviews */}
					<GymReviews rating={gym.rating} reviews={reviews} />

				</View>


			</Animated.View>
		</ScrollView>
	)
}
