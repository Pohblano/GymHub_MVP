import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
// Styles
import { container } from '@/styles/containers.styles'
import { text } from '@/styles/text.styles'
// Components
import { BoldText } from '@/components/Text/StyledText'
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import CustomLink from '@/components/Buttons/CustomLink'
import Languages from '@/components/Settings/Utils/LanguagePicker'

export default function LanguageScreen() {
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
						style={{ display: 'flex', alignSelf: 'start', marginTop: 4,  marginRight: 10}}
						textStyle={{}}
						disabled={false}
						loading={false} />
					<View className='d-flex self-center gap-1'>
						<BoldText className="" style={[text.small, { alignContent: 'center' }]}>{t('Languages')}</BoldText>
						<Text style={[text.regular, text.grey, { fontWeight: 400 }]}>{t('Choose you preferred language.')}</Text>
					</View>
				</View>

				<Languages style={{marginTop: 40}}/>

			</HorizontalPaddedView>
		</SafeAreaView>
	)
}