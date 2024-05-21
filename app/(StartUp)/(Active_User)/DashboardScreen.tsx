// Modules
import React, { useEffect, useState } from 'react'
// * Routing
import { SafeAreaView } from 'react-native'
import { useRouter, useSegments } from 'expo-router'
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


export default function DashboardScreen() {
	const router = useRouter();
	const { logout, user } = useAuth();
	console.log(user)
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}, []);

	return (
		<>
			{loading ?
				<PageLoading />
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