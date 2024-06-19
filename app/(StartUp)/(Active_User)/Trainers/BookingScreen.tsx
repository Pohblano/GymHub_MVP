import React from 'react'
import {Text, View} from 'react-native'
import { CustomSafeAreaView } from '@/components/Views/PaddedView'
import { container } from '@/styles/containers.styles'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function BookingScreen(){
	return(
		<SafeAreaView>
				<Text>Booking Page</Text>
		</SafeAreaView>
	)
}