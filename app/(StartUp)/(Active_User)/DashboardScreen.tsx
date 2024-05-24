// Modules
import React, { useEffect, useState, useCallback } from 'react'
// * Routing
import { SafeAreaView } from 'react-native'
import { useRouter, useSegments, Redirect, useFocusEffect } from 'expo-router'
// Styling
import { StyleSheet } from 'react-native'
import { container } from '@/styles/containers.styles'
import { text } from '@/styles/text.styles'
// Componenets
import { Text, View } from '@/components/Themed'
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import { BoldText } from '@/components/Text/StyledText'
import CustomButton from '@/components/Buttons/CustomButton'
// Context
import { useAuth } from '@/context/Auth.context'
import PageLoading from '@/components/Loading/PageLoading'

import SetupProfileScreen from '../(New_User)/SetupProfileScreen'

export default function DashboardScreen() {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false)
	const { logout, user } = useAuth();
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		// setTimeout(() => {
		// 	setLoading(false)
		// 	// if User is new should route autmatically to setup profile
		// 	router.push('SetupProfileModalScreen')
		// }, 2000)
		
		//set conditions that finds if user isnew user
		//then render a function that uses route to the
		//modal stack screen

	}, []);

	const onModalClose = () => {
		setShowModal(false);
	};

	return (
		<>
			{loading ?
				<SetupProfileScreen />
				:
				<SafeAreaView style={[container.wrapper, container.bg_white]}>
					<HorizontalPaddedView>
						<BoldText>This is the Home Page</BoldText>
						<CustomButton
							loading={false}
							onPress={() => logout()}
							onLongPress={() => { }}
							title="Sign Out"
							iconLeft={''}
							iconRight={''}
							activeOpacity={0.8}
							width={'100%'}
							style={container.bg_yellow}
							textStyle={[text.primary_button, text.white]}
							disabled={false}
						/>

					</HorizontalPaddedView>
				</ SafeAreaView>}
		</>
	)
}


const styles = StyleSheet.create({

})