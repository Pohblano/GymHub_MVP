import React, { Dispatch, SetStateAction, useState } from 'react'
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
// Styles
import { text } from '@/styles/text.styles'
import { useFadeInStyles } from '@/hooks/animationStyle'
// Components
import LargeImageSlider from '@/components/Utils/LargeImageSlider'
import { BoldText, MediumText, SemiBoldText } from '@/components/Text/StyledText'
import { GymAllEquipment, GymAmenities, GymBiography } from './Utils/Stateless'
import { Seperator } from '@/components/Views/PaddedView'
import GymDisplayImage from './Utils/GymDisplayImage'
import GymLocation from './Utils/GymLocation'
import GymReviews from './Utils/GymReviews'
import ScheduleStatus from '@/components/Utils/ScheduleStatus'
// Context
import { useGym } from '@/context/Gym.context'
import { openPhoneApp, openSocial, openWhatsApp } from '@/utils/linking'
import { Facebook, Instagram, Tiktok } from '@/constants/Icons'
import { useTranslation } from 'react-i18next'


export default function About() {
	const { gym, reviews } = useGym()
	const images = gym.images
	const animation = useFadeInStyles(50, 50, 800, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 500, 400)
	const {t} = useTranslation()
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={{}}>
			<View className='flex-1 d-flex'>
				{/* Carousel */}
				<Animated.View entering={FadeInDown.duration(800)}>
					<LargeImageSlider images={images} />
				</Animated.View>

				<View>

					<BoldText style={[text.largest, { marginTop: 20 }, delayedAnimation.slideLeftStyle]}>{gym.name}</BoldText>

					<Animated.View style={delayedAnimation.slideLeftStyle} className='d-flex flex-row mt-2'>
						<ScheduleStatus schedule={gym.schedule} business={t('The gym')} subtitle={t('is open')} />
					</Animated.View>


					<View className='d-flex flex-row'>
						<Animated.View className={'d-flex flex-row flex-1'} entering={FadeInRight.duration(800).delay(200)} style={[{ marginTop: 30 }, styles.contacts]}>
							<Pressable style={[styles.phone, {backgroundColor: gym.theme.buttons}]} onPress={() => openPhoneApp(gym.contact_info.phone)}>
								<Feather name="phone" size={26} color="white" />
							</Pressable>
							<Pressable style={[styles.whatsApp, {backgroundColor: gym.theme.buttons}]} onPress={() => openWhatsApp(gym.contact_info.phone)}>
								<FontAwesome5 name="whatsapp" size={30} color="white" />
							</Pressable>
						</Animated.View>

						<Animated.View className={'self-end'} entering={FadeInLeft.duration(800).delay(200)}>
							<View className={'d-flex flex-row'}>
								<Pressable style={{ width: 30, marginRight: 17 }} onPress={() => openSocial(gym.contact_info.tiktok)}>
									<Tiktok height={50} iconStyle={{}} width={40} />
								</Pressable>
								<Pressable style={{ width: 30, marginRight: 22 }} onPress={() => openSocial(gym.contact_info.facebook)}>
									<Facebook height={50} iconStyle={{ width: 40 }} />
								</Pressable>

								<Pressable style={{ width: 30, marginRight: 15 }} onPress={() => openSocial(gym.contact_info.instagram)}>
									<Instagram height={50} iconStyle={{ width: 40 }} />
								</Pressable>
							</View>
						</Animated.View>
					</View>

					<Animated.View style={animation.fadeInStyle}>
						<Seperator style={{ marginTop: 20 }} />
					</Animated.View>

					<Animated.View style={{ marginTop: 30 }} entering={FadeInDown.duration(800).delay(200)}>
						<SemiBoldText style={[ text.smedium]}>{t('Overview')}</SemiBoldText>
						<GymBiography bio={gym.biography} />
					</Animated.View>

					<Animated.View style={{ marginTop: 40 }} entering={FadeInDown.duration(800).delay(400)}>
						<GymAllEquipment list={gym.equipment} />
					</Animated.View>

					<Animated.View style={{ marginTop: 10 }} entering={FadeInDown.duration(800).delay(600)}>
						<GymDisplayImage image={images.gym_display_image} caption={t('Join \nthe Family')} />
					</Animated.View>

					<Animated.View style={{ marginTop: 40 }} entering={FadeInDown.duration(800).delay(800)}>
						<GymAmenities list={gym.amenities} />
					</Animated.View>


					<Animated.View style={{ marginTop: 10 }} entering={FadeInDown.duration(800).delay(1000)}>
						<GymLocation address={gym.address} />
					</Animated.View>

					<Animated.View style={animation.fadeInStyle}>
						<Seperator style={{ marginTop: 30 }} />
					</Animated.View>

					<Animated.View entering={FadeInDown.duration(800).delay(1200)}>
						<GymReviews rating={gym.rating} reviews={reviews} />
					</Animated.View>

				</View>


			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	contacts: {
		alignSelf: 'flex-start'
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		borderBottomEndRadius: 50,
		borderBottomStartRadius: 50
	},
	phone: {
		width: 50,
		marginRight: 15,
		marginTop: 3,
		padding: 10,
		paddingLeft: 12,
		borderRadius: 60
	},
	whatsApp: {
		width: 50,
		marginRight: 20,
		padding: 10,
		paddingLeft: 12,
		borderRadius: 60
	}
})