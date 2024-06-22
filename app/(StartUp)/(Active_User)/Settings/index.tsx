// Modules
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
// Styling
import { container } from '@/styles/containers.styles'
import { text } from '@/styles/text.styles'
// Components
import CustomLink from '@/components/Buttons/CustomLink'
import { BoldText, RegularText } from '@/components/Text/StyledText'
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import { ButtonPressable } from '@/components/Buttons/CustomPressable'
// Context
import { useAuth } from '@/context/Auth.context'
import { Image } from 'expo-image'

import { useTranslation } from 'react-i18next'

export default function SettingsScreen() {
	const router = useRouter()
	const { logout, user } = useAuth();
	const { t } = useTranslation()

	return (
		<SafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>
				<View style={{ paddingVertical: 24 }}>
					<Animated.View style={{}} className='d-flex flex-row' entering={FadeInRight.duration(600)}>
						<CustomLink
							onPress={() => { router.back() }}
							onLongPress={() => { }}
							title={''}
							iconLeft={null}
							iconRight={<FontAwesome name="chevron-left" style={[text.black, text.smedium]} />}
							iconRightStyle={{}}
							style={{ display: 'flex', marginBottom: 0, marginRight: 10 }}
							textStyle={{}}
							disabled={false}
							loading={false} />
						<BoldText style={[text.large]}>{t('Settings')}</BoldText>
					</Animated.View>
					{/* <Text style={[text.regular, text.grey, { fontWeight: 400 }]}>Update your preferences here</Text> */}
				</View>

				<View style={{}}>
					<View className='d-flex gap-4' style={{ marginVertical: 30 }}>
						<Animated.View entering={FadeInRight.duration(600).delay(100)} className='d-flex flex-row' style={{ alignItems: 'center' }}>
							<Image source={user.profile_img} style={[styles.avatar]} />
							<View className='d-flex gap-1'>
								<BoldText style={[text.small, text.light_grey]}>{user.username}</BoldText>
								<RegularText style={[text.light_grey]}>{user.email}</RegularText>
							</View>
						</Animated.View>
						{/* <Animated.View entering={FadeInDown.duration(600).delay(100)}>
							<CustomButton
								onPress={() => { }}
								onLongPress={undefined}
								title={t('Edit Profile')}
								iconLeft={undefined}
								iconRight={<Feather name="edit-3" size={24} color="white" />}
								style={styles.button}
								textStyle={[text.sub_heading, { color: 'white' }]}
								disabled={false}
								activeOpacity={0.9}
								loading={undefined}
								width={undefined} />
						</Animated.View> */}
					</View>

					<View>
						<Animated.View style={[styles.section]} entering={FadeInDown.duration(600).delay(200)}>
							<Text style={[styles.sectionHeader]}>{t('Preferences')}</Text>

							{/* <ButtonPressable activeOpacity={0.5} style={[styles.item]}>
								<View style={[styles.icon]}>
									<FontAwesome5 name="user-circle" size={28} color="#616161" />
								</View>
								<Text className='flex-1' style={[text.sub_heading, text.black]}>Account</Text>
								<View style={[]}>
									<Entypo name="chevron-right" size={24} color="#616161" />
								</View>
							</ButtonPressable> */}
							<ButtonPressable
								activeOpacity={0.5}
								style={[styles.item]}
								onPress={() => router.push('/Settings/LanguageScreen')}
							>
								<View style={[styles.icon]}>
									<Ionicons name="earth-outline" size={28} color="#616161" />
								</View>
								<Text className='flex-1' style={[text.sub_heading, text.black]}>{t('Language')}</Text>
								<View className='d-flex flex-row' style={[]}>
									<Text className='self-center'>{ }</Text>
									<Entypo name="chevron-right" size={24} color="#616161" />
								</View>
							</ButtonPressable>

						</Animated.View>


						<Animated.View style={[styles.section]} entering={FadeInDown.duration(600).delay(300)}>
							<Text style={[styles.sectionHeader]}>{('Help')}</Text>
							<ButtonPressable
								activeOpacity={0.5}
								style={[styles.item]}
								onPress={() => router.push('/Settings/ReportBugScreen')}>

								<View style={[styles.icon]}>
									<FontAwesome5 name="flag" size={24} color="#616161" />
								</View>
								<Text className='flex-1' style={[text.sub_heading, text.black]}>{t('Report Bug')}</Text>
								<View style={[]}>
									<Entypo name="chevron-right" size={24} color="#616161" />
								</View>
							</ButtonPressable>

							<ButtonPressable activeOpacity={0.5} style={[styles.item]}>
								<View style={[styles.icon]}>
									<MaterialCommunityIcons name="email-outline" size={28} color="#616161" />
								</View>
								<Text className='flex-1' style={[text.sub_heading, text.black]}>{t('Contact Us')}</Text>
								<View style={[]}>
									<Entypo name="chevron-right" size={24} color="#616161" />
								</View>
							</ButtonPressable>
						</Animated.View>

						<Animated.View style={styles.section} entering={FadeInDown.duration(600).delay(400)}>
							<Text style={[styles.sectionHeader]}>{t('Sign Out')}</Text>
							<ButtonPressable activeOpacity={0.5} style={[styles.item]} onPress={logout}>
								<View style={[styles.icon]}>
									<Octicons name="sign-out" size={26} color="#616161" />
								</View>
								<Text className='flex-1' style={[text.sub_heading, text.black]}>{t('Sign Out')}</Text>
								<View style={[]}>
									<Entypo name="chevron-right" size={24} color="#616161" />
								</View>
							</ButtonPressable>
						</Animated.View>
					</View>

				</View>

			</HorizontalPaddedView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	section: {
		display: 'flex',
		gap: 3,
		marginBottom: 8
	},
	sectionHeader: {
		paddingVertical: 12,
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'uppercase',
		letterSpacing: .4,
		color: '#a7a7a7'
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		backgroundColor: '#F2F2F2',
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	icon: {
		width: 30,
		marginRight: 20,
	},
	avatar: {
		height: 70,
		width: 70,
		borderRadius: 999,
		alignSelf: 'center',
		borderWidth: 2,
		borderColor: '#e7be60',
		marginBottom: 5,
		marginRight: 15
	},
	button: {
		display: 'flex',
		gap: 3,
		alignItems: 'center',
		backgroundColor: '#e7be60',
	}



})