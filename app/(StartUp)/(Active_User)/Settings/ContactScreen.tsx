import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Image } from 'expo-image'
// Styles
import { container } from '@/styles/containers.styles'
import { text } from '@/styles/text.styles'
// Components
import { BoldText } from '@/components/Text/StyledText'
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import CustomLink from '@/components/Buttons/CustomLink'
import { openPhoneApp, openSocial, openWhatsApp } from '@/utils/linking'

export default function ContactScreen() {
	const { t } = useTranslation();
	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>

				<View style={{ marginTop: 10 }} className='d-flex flex-row'>
					<CustomLink
						onPress={() => { router.back() }}
						onLongPress={() => { }}
						title={''}
						iconLeft={null}
						iconRight={<FontAwesome name="chevron-left" style={[text.black, text.smedium]} />}
						iconRightStyle={{}}
						style={{ display: 'flex', alignSelf: 'start', marginTop: 3, marginRight: 10, justifySelf: 'start' }}
						textStyle={{}}
						disabled={false}
						loading={false} />
					<View className='d-flex gap-1 w-full'>
						<BoldText className="" style={[text.small]}>{t('Get in Touch')}</BoldText>
						{/* <Text style={[text.regular, text.grey, { fontWeight: 400, width: '90%' }]}>{t('For any general questions concerning the app or any other additional inquiries.')}</Text> */}
					</View>
				</View>

				<View style={{ marginTop: 60, display: 'flex', gap: 20 }}>

					<View className='d-flex flex-row gap-4'>
						<Image source={require('@/assets/images/me.jpg')} style={styles.image} contentFit='contain' />
						<View className='flex-1 justify-between'>
							<Text style={[text.black, text.small, { fontWeight: 'bold', marginTop: 40, marginBottom: 14 }]}>
								{t(`Hi, I'm Alberto.`)}
							</Text>
							<Text style={[text.black, text.sub_heading, { fontWeight: 300 }]}>
								{t('I am the creator and sole developer of this app.')}
							</Text>
						</View>
					</View>
					<Text style={[text.black, text.sub_heading, { marginBottom: 30, fontWeight: 300 }]}>
						{t('The goal of this app is to allow users find and connect with local gyms. In the near future users will be able to connect with other users as well.\n\nWith that being said, I am always looking for ways to improve the app for a better user experience. So feel free to reach out for any feedback, suggestions, or for any other inquiries.')}
					</Text>

					<View className={'d-flex flex-row '} style={[styles.contacts]}>
						<Pressable style={[styles.icon,styles.phone, container.bg_yellow]} onPress={() => openPhoneApp('+16263928591')}>
							<Feather name="phone" size={26} color="white" />
						</Pressable>
						<Pressable style={[styles.icon, styles.whatsApp, container.bg_yellow]} onPress={() => openWhatsApp('+16263928591')}>
							<FontAwesome5 name="whatsapp" size={30} color="white" />
						</Pressable>
						<Pressable style={[styles.icon, styles.email, container.bg_yellow]} onPress={() => openSocial('mailto:albertjasa@icloud.com')}>
                            <Feather name="mail" size={26} color="white" />
                        </Pressable>
					</View>


				</View>

			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 120,
		height: 120,
		borderRadius: 1000,
		resizeMode: 'cover',
		alignSelf: 'center',
		borderWidth: 3,
		borderColor: '#e7be60',
	},
	contacts: {
		alignSelf: 'flex-end'
	},
	phone: {
		marginRight: 15,
		marginTop: 3,
	},
	whatsApp: {
		marginRight: 15,
	},
	icon: {
		width: 50,
		padding: 10,
		paddingLeft: 12,
		borderRadius: 60
	},
	email:{
		marginTop: 3,
	}
})