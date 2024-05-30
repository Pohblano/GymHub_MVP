import React from 'react'
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
import GymDisplayImage from './Utils/GymDisplayImage'
import { Seperator } from '@/components/Views/PaddedView'

// Images
import { images_gym207 } from '@/constants/Gym207.images'
import GymLocation from './Utils/GymLocation'


export default function About() {
	return (
		<Animated.View className='flex-1 d-flex'>

			{/* Carousel */}
			<LargeImageSlider />

			<View>
				{/* Header */}
				<BoldText style={text.black} className='text-5xl mt-5'>{'20/7 Gym'}</BoldText>

				{/* Quick Info */}
				<View className='d-flex flex-row mt-2'>
					{/* Calculate distance of you from the actual gym */}
					<MediumText style={text.light_grey}>
						{'3km away'}
					</MediumText>
					<FontAwesome style={{ color: '#d6d6d6' }} className=' align-sub text-sm ml-4' name={'circle'} />
					<View className='d-flex flex-row ml-4'>
						<MediumText style={text.light_grey} className='mr-1'>{'5'}
						</MediumText>
						<FontAwesome name="star" size={16} color="#ffd700" />
						<MediumText style={text.light_grey} className='ml-1'>{'(6 Reviews)'}
						</MediumText>
					</View>
					<FontAwesome style={{ color: '#d6d6d6' }} className=' align-sub text-sm ml-4' name={'circle'} />
					<MediumText style={text.light_grey} className='ml-3'>{'$$'}
					</MediumText>
				</View>

				<Seperator style={{ marginTop: 30 }} />

				{/* Biography */}
				<GymBiography bio={'20/7 Gym is a staple to many locals. Located near the heart of the city, it is surrounded with a variety of accessible stores and vendors all within a walking distance. The gym itself holds a plethora of equipment including the popular three, being the squat rack.'} />

				<Seperator style={{ marginTop: 30 }} />

				{/* Equipment Offered */}
				<GymAllEquipment list={[{ title: 'Extensive Dumbell Rack', description: 'Dumbell weights up to 100lbs' }, { title: 'Weight Machines', description: 'Machines for all body parts (e.g. Squat Rack, Bench Press, Rows, etc.)' }, { title: 'Cardio Machines', description: 'Variety of machines for cardio (e.g. treadmill, cycles, stair master, etc.)' }, { title: 'Supplements', description: 'Access to popular supplements (e.g. Protein Powder, Creatine, BCAAs, etc.)' }, { title: 'Protein Bar', description: 'Small fruit and protein smoothie bar, good for pre or post workout.' }]} />

				{/* Display Image */}
				<GymDisplayImage image={images_gym207.gym_display_image} caption={'Join \nthe Family'} />

				{/* Amenities Offered */}
				<GymAmenities list={[{ title: 'Wifi' }, { title: 'Showers' }, { title: 'Storage' }]} />

				<Seperator style={{ marginTop: 30 }} />

				{/* Location of Gym */}
				<GymLocation address={'C. Tercera 7843, Zona Centro, 22000 Tijuana, B.C.'} />

				<Seperator style={{ marginTop: 30 }} />

			</View>


		</Animated.View>
	)
}
