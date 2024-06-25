import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
// Styles
import { container } from '@/styles/containers.styles'
import { text } from '@/styles/text.styles'
// Components
import { BoldText } from '@/components/Text/StyledText'
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import CustomLink from '@/components/Buttons/CustomLink'
import CustomButton from '@/components/Buttons/CustomButton'
import { useAuth } from '@/context/Auth.context'


export default function EditProfileScreen() {
	const { user, deleteUserProfile } = useAuth()
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
						style={{ display: 'flex', alignSelf: 'start', marginTop: 4, marginRight: 10, justifySelf: 'start' }}
						textStyle={{}}
						disabled={false}
						loading={false} />
					<View className='d-flex gap-1 w-full'>
						<BoldText className="" style={[text.small]}>{t('Edit Profile')}</BoldText>
						<Text style={[text.regular, text.grey, { fontWeight: 400, width: '90%' }]}>{t('Update your profile information here.')}</Text>
					</View>
				</View>

				{/* <View style={{marginTop: '10%'}}>
					<CustomButton
						onPress={() => { deleteUserProfile({email: user.email, password: user.password}) }}
						onLongPress={undefined}
						title={t('Delete Profile')}
						iconLeft={undefined}
						iconRight={''}
						style={styles.button}
						textStyle={[text.sub_heading, { color: 'white' }]}
						disabled={false}
						activeOpacity={0.9}
						loading={undefined}
						width={undefined} />
				</View> */}


			</HorizontalPaddedView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	button: {
		display: 'flex',
		gap: 3,
		alignItems: 'center',
		backgroundColor: 'red',
	}
})