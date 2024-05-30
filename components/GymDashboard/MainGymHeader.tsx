// Modules
import React from 'react'
import { View } from 'react-native'
// Styling
import Animated from 'react-native-reanimated'

import { text } from '@/styles/text.styles'
// Components
import { IconPressable } from '../Buttons/CustomPressable'
import { BoldText, RegularText } from '../Text/StyledText'
import ScrollableNavBar from '../Utils/ScrollableNavBar'

function MainGymHeader({activeItem, setActiveItem, gym_title}) {
	return (
		<Animated.View className='flex-none' >
			<IconPressable
				className='self-end mb-8'
				style={[text.black, text.large]}
				onPress={() => { }}
				icon='gear' />

			<View className='mb-2'>
				<RegularText style={[text.light_grey, text.small]}>{'This is'}</RegularText>
				<BoldText style={[text.large,]}>{gym_title}</BoldText>
			</View>

			<ScrollableNavBar
				items={['Home', 'Trainers', 'About', 'Socials', 'Store']}
				activeItem={activeItem}
				setActiveItem={setActiveItem} />
		</Animated.View >
	)
}

export default MainGymHeader