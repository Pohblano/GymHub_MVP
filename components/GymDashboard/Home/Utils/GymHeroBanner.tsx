// Modules
import React from 'react'
import { ImageBackground, View, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
// Styling
import { text } from '@/styles/text.styles'
// Components
import { IconPressable } from '../../../Buttons/CustomPressable'
import { BoldText, RegularText } from '../../../Text/StyledText'
import ScrollableNavBar from '../../../Utils/ScrollableNavBar'
import CustomLink from '../../../Buttons/CustomLink'

function GymHeroBanner({image, caption}) {
	return (
		<ImageBackground
			style={{ height: 192, width: 'auto' }}
			imageStyle={{ borderRadius: 10 }}
			source={{uri: image}}
		>
			<LinearGradient
				colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
				start={[0, 0]} end={[1, 0]}
				style={styles.background}
			>
				<BoldText className=' w-5/6' style={[text.small, text.white]}>{caption}</BoldText>
				<CustomLink
					onPress={() => { }}
					onLongPress={() => { }}
					title={'See more'}
					iconLeft={null}
					iconRight={<FontAwesome name="chevron-right" />}
					iconRightStyle={text.gym207}
					style={{ display: 'flex' }}
					textStyle={text.gym207}
					disabled={false}
					loading={false} />
			</LinearGradient>
		</ImageBackground>
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