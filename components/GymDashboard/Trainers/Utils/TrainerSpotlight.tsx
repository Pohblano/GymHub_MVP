// Modules
import React from 'react'
import { ImageBackground, View, StyleSheet, Pressable } from 'react-native'
import Animated from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
// Styling
import { text } from '@/styles/text.styles'
import { useFadeInStyles } from '@/hooks/animationStyle'
// Components
import { BoldText, LightText, RegularText } from '../../../Text/StyledText'
import CustomLink from '../../../Buttons/CustomLink'
// Context
import { useGym } from '@/context/Gym.context'
import { TrainerType } from '../Trainers'
import { Link } from 'expo-router'
import { useTranslation } from 'react-i18next'



export default function TrainerSpotlight({ trainer }: {
	trainer: TrainerType
}) {
	const { gym } = useGym();
	const images = gym.images;
	const animation = useFadeInStyles(50, 50, 800,0)
	const delayedAnimation = useFadeInStyles(50, 50, 600, 200)
	const delayeddAnimation = useFadeInStyles(50, 50, 600, 400)
	const {t} = useTranslation()
	return (
		<Animated.View style={animation.slideUpStyle}>
			<Link
			asChild
			key={trainer.uid}
			href={{
				pathname: `/Trainers/[uid]`,
				params: {
					uid: trainer.uid,
				}
			}}>
			<Pressable style={{ height: 350, width: 'auto' }}>
				<Image
					source={{ uri: gym.images.trainer_spotlight }}
					style={{ height: 350, width: 'auto', borderRadius: 10 }} />
				<LinearGradient
					colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']}
					start={[0, 0]} end={[1, 0]}
					style={styles.background}>
					<Animated.View style={delayedAnimation.slideLeftStyle}>
						<LightText style={[text.white, text.regular]}>
							{t('Trainer Spotlight:')}
						</LightText>
						<BoldText className=' w-5/6' style={[text.large, text.white]}>
							{`${t('Meet\n')}${trainer.first_name}`}
						</BoldText>
					</Animated.View>
					<Animated.View style={delayeddAnimation.slideLeftStyle}>
						<LightText className='mb-1' style={[text.white, { width: '75%' }]}>{trainer.specialty?.join(', ')}</LightText>
						<CustomLink
							onPress={() => { }}
							onLongPress={() => { }}
							title={t('See more')}
							iconLeft={null}
							iconRight={<FontAwesome name="chevron-right" />}
							iconRightStyle={[{ marginLeft: 4, alignSelf: 'baseline', color: gym.theme.text }]}
							style={{ display: 'flex' }}
							textStyle={{color: gym.theme.text}}
							disabled={false}
							loading={false} />
					</Animated.View>

				</LinearGradient>
			</Pressable>
		</Link>
		</Animated.View>
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
