import React from 'react'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import ReadMore from 'react-native-read-more-text'
import FontAwesome from '@expo/vector-icons/FontAwesome';
// Styles
import { text } from '@/styles/text.styles'
import { useFadeInStyles } from '@/hooks/animationStyle'
// Components
import { RegularText, SemiBoldText } from '@/components/Text/StyledText'
import MasonryImageGallery from '@/components/Utils/MasonryImageGallery'
// Context
import { useGym } from '@/context/Gym.context'
import { TrainerType } from './Trainers'
import { Entypo, Feather, FontAwesome6 } from '@expo/vector-icons';
import { Facebook, Instagram, Tiktok } from '@/constants/Icons';
import { openSocial } from '@/utils/linking';
import { useTranslation } from 'react-i18next';

export default function About({ trainer }: {
	trainer: TrainerType
}) {
	const { gym, createTrainers } = useGym()
	const animation = useFadeInStyles(50, 50, 600, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 600, 200)
	const delayeddAnimation = useFadeInStyles(50, 50, 600, 400)
	const {t} = useTranslation()
	const renderTruncatedFooter = (handlePress: () => any) => {
		return (
			<Text
				style={{ color: '#528eff', marginTop: 5 }}
				onPress={() => { handlePress(); }}>
				{t('Read more')}
			</Text>
		)
	}

	const renderRevealedFooter = (handlePress: () => any) => {
		return (
			<Text
				style={{ color: '#528eff', marginTop: 5 }}
				onPress={() => { handlePress(); }}>
				{t('Show less')}
			</Text>
		)
	}

	return (
		<Animated.View className='flex-1 d-flex'>

			<Animated.View className='d-flex' style={[{ marginBottom: 10, marginTop: 30 }]} entering={FadeInDown.duration(600)} >
				<SemiBoldText style={[text.smedium, { marginBottom: 20 }]}>{t('Overview')}</SemiBoldText>
				<ReadMore
					numberOfLines={8}
					renderTruncatedFooter={renderTruncatedFooter}
					renderRevealedFooter={renderRevealedFooter}>
					<Text style={[{ fontWeight: 300 }, text.sub_heading, text.black]}>
						{trainer.biography}
					</Text>
				</ReadMore>

				{(
					(trainer.socials?.facebook || trainer.socials?.instagram || trainer.socials?.tiktok) &&
					<Animated.View entering={FadeInLeft.duration(600).delay(200)} style={styles.iconContainer}>
						<View className={'d-flex flex-row'} >
							{(trainer.socials?.facebook && <Pressable style={{ width: 30, marginRight: 15 }} onPress={() => openSocial(trainer.socials?.facebook)}>
								<Facebook height={32} iconStyle={{}} />
							</Pressable>)}

							{(trainer.socials?.instagram && <Pressable style={{ width: 30, marginRight: 15 }} onPress={() => openSocial(trainer.socials?.instagram)}>
								<Instagram height={32} iconStyle={{}} />
							</Pressable>)}

							{(trainer.socials?.tiktok && <Pressable style={{ width: 30, marginRight: 10 }} onPress={() => openSocial(trainer.socials?.tiktok)}>
								<Tiktok height={32} iconStyle={{}} width={32} />
							</Pressable>)}
						</View>
					</Animated.View>
				)}
			</Animated.View>



			<Animated.View entering={FadeInDown.duration(600).delay(600)} style={[{ marginTop: 30 }]}>
				{/* <View className='d-flex flex-row'> */}
				<SemiBoldText style={[text.lighter_grey, text.regular, { marginBottom: 20 }]}>{t('SPECIALTIES')}</SemiBoldText>

				{trainer.specialty?.map((x, index) => (
					<View key={index} className='d-flex flex-row gap-3'>
						<View style={{ width: 30 }}>
							<Entypo name="dot-single" size={24} color="black" />
						</View>
						<View style={{ width: '100%' }}>
							<Text style={[text.black, text.sub_heading]}>{x}</Text>
							<RegularText style={[text.light_grey, text.regular, {}]}>{''}</RegularText>
						</View>
					</View>
				))}
				{/* </View> */}

			</Animated.View>

			<Animated.View entering={FadeInDown.duration(600).delay(600)} style={[{ marginTop: 30 }]}>
				{/* <View className='d-flex flex-row'> */}
				<SemiBoldText style={[text.lighter_grey, text.regular, { marginBottom: 20 }]}>{t('AVAILABLE')}</SemiBoldText>
				<View className='d-flex flex-row gap-3'>
					<View style={{ width: 30 }}>
						<FontAwesome name="calendar-o" size={24} color="black" />
					</View>
					<View style={{ width: '100%' }}>
						<Text className='mb-2' style={[text.black, text.sub_heading]}>{trainer.schedule_overview?.days}</Text>
						<RegularText style={[text.light_grey, text.regular, {}]}>{''}</RegularText>
					</View>
				</View>
				<View className='d-flex flex-row gap-3'>
					<View style={{ width: 30 }}>
						<FontAwesome6 name="clock" size={24} color="black" />
					</View>
					<View style={{ width: '100%' }}>
						<Text style={[text.black, text.sub_heading]}>{trainer.schedule_overview?.time}</Text>
						<RegularText style={[text.light_grey, text.regular, {}]}>{''}</RegularText>
					</View>
				</View>
				{/* </View> */}

			</Animated.View>


			{(trainer.img_list && trainer.img_list.length > 0) ?
				<Animated.View entering={FadeInDown.duration(600).delay(400)} style={[{ marginTop: 30 }]}>
					<SemiBoldText style={[text.lighter_grey, text.regular, { marginBottom: 20 }]}>{t('GALLERY')}</SemiBoldText>
					<MasonryImageGallery images={trainer.img_list} style={{}} />
				</Animated.View> :
				null
			}

		</Animated.View>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 200,
		alignSelf: 'stretch',
		borderRadius: 8,
		margin: 3
	},
	masonryList: {
		alignSelf: 'stretch',
	},
	fullscreenImage: {
		width: '100%',
		height: '100%',
	},
	iconContainer: {
		position: 'absolute',
		alignSelf: 'flex-end'
	}
});
