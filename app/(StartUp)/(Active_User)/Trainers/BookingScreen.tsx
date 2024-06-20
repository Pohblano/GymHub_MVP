import React from 'react'
import {Text, View} from 'react-native'
import { CustomSafeAreaView } from '@/components/Views/PaddedView'
import { container } from '@/styles/containers.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'


export default function BookingScreen(){
	const {t} = useTranslation()
	return(
		<SafeAreaView>
				<Text>{t('Booking Page')}</Text>
		</SafeAreaView>
	)
}