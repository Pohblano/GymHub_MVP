// Modules
import React from 'react'
import { ImageBackground, View, StyleSheet, Pressable } from 'react-native'
import Animated from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
// Styling
import { text } from '@/styles/text.styles'
// Components
import { BoldText, LightText, RegularText } from '../../../Text/StyledText'
import CustomLink from '../../../Buttons/CustomLink'
import { Link } from 'expo-router'

function GymHeroBanner({ href, image, title, subtitle, details, textAnimation, linkAnimation }: {
	image: string,
	href: string,
	title: string,
	subtitle: string,
	details: string,
	textAnimation?: any,
	linkAnimation?: any
}) {
	return (
		<Link
			asChild
			href={{
				pathname: href,

			}}>
			<Pressable>
				<Image
					style={{ height: 250, width: 'auto', borderRadius: 10 }}
					source={{ uri: image }} />
				<LinearGradient
					colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
					start={[0, 0]} end={[1, 0]}
					style={styles.background}>
					<Animated.View style={{}} entering={textAnimation}>
						<LightText style={[text.white, text.regular]}>
							{subtitle}
						</LightText>
						<BoldText className='w-full font-large' style={[text.large, text.white]}>
							{title}
						</BoldText>
					</Animated.View>
					<Animated.View style={{}} entering={linkAnimation}>
						<LightText className='mb-1' style={[text.white, { width: '75%' }]}>
							{details}
						</LightText>
						<CustomLink
							onPress={() => { }}
							onLongPress={() => { }}
							title={'See more'}
							iconLeft={null}
							iconRight={<FontAwesome name="chevron-right" />}
							iconRightStyle={[text.gym207, { marginLeft: 4, alignSelf: 'baseline' }]}
							style={{ display: 'flex' }}
							textStyle={text.gym207}
							disabled={false}
							loading={false} />
					</Animated.View>

				</LinearGradient>
			</Pressable>
		</Link>
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