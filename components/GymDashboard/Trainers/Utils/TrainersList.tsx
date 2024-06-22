// Modules
import React, {useEffect} from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Animated, { EntryExitTransition, FadeIn, FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated'
import { Image } from 'expo-image'
// Styling
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { text } from '@/styles/text.styles'

// Components
import { BoldText, LightText, RegularText, SemiBoldText } from '@/components/Text/StyledText'
import CustomLink from '@/components/Buttons/CustomLink'
// Context
import { useGym } from '@/context/Gym.context'
import { TrainerType } from '../Trainers'
import { Link } from 'expo-router'
import { useFadeInStyles } from '@/hooks/animationStyle'
import { sequentialStyles } from '@/hooks/sequentialAnimationStyles'
import { useTranslation } from 'react-i18next'

export default function TrainersList({ trainers }: {
	trainers: TrainerType[]
}) {
	const {gym} = useGym()
	const delayeddAnimation = useFadeInStyles(50, 50, 500, 400)
	const sequentialSlideUpStyle = sequentialStyles(trainers, 50, 600, 0, 200)
	const {t} = useTranslation()
	return (
		<Animated.View className='d-flex' style={{ marginTop: 40 }} entering={FadeInDown.duration(600).delay(400)}>
			<SemiBoldText style={[text.sub_heading, delayeddAnimation.fadeInStyle]}>{t('Trainers')}</SemiBoldText>

			{trainers.map((trainer, index) => (
				<Animated.View key={index}>
					<Link
						asChild
						key={trainer.uid}
						href={{
							pathname: `/Trainers/[uid]`,
							params: {
								uid: trainer.uid,
							}
						}}>
						<Pressable style={{ height: 200, width: 'auto', marginTop: 10 }}>
							<Image
								source={{ uri: trainer.img }}
								style={{ height: 200, width: 'auto', borderRadius: 10 }} />
							<LinearGradient
								colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,.8)','rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,0)']}
								start={[0, 0]} end={[1, 0]}
								style={styles.background}>

								<BoldText className='w-5/6' style={[text.medium, text.white]}>{trainer.name?.split(' ').join('\n')}</BoldText>

								<Animated.View>
									<LightText className='mb-1' style={[text.white, { width: '75%' }]}>{trainer.specialty?.join(', ')}</LightText>
									<CustomLink
										onPress={() => { }}
										onLongPress={() => { }}
										title={t('See more')}
										iconLeft={null}
										iconRight={<FontAwesome name="chevron-right" />}
										iconRightStyle={[{marginLeft: 4, alignSelf: 'baseline', color: gym.theme.text}]}
										style={{ display: 'flex' }}
										textStyle={{color: gym.theme.text}}
										disabled={false}
										loading={false} />
								</Animated.View>

							</LinearGradient>
						</Pressable>
					</Link>
				</Animated.View>
			))}

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

