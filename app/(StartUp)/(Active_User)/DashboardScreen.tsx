// Modules
import React, { useEffect, useState, useCallback } from 'react'
import Animated from 'react-native-reanimated'
import { ImageBackground, SafeAreaView, Text, View, StyleSheet, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
// * Routing
import { useRouter, useSegments, Redirect, useFocusEffect } from 'expo-router'
// Styling
import { text } from '@/styles/text.styles'
import { container } from '@/styles/containers.styles'
// Components
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import PageLoading from '@/components/Loading/PageLoading'
import MainGymHeader from '@/components/GymDashboard/MainGymHeader'
import Home from '@/components/GymDashboard/Home/Home'
import About from '@/components/GymDashboard/About/About'
// Context
import { useAuth } from '@/context/Auth.context'

import { images_gym207 } from '@/constants/Gym207.images'

export default function DashboardScreen() {
	const router = useRouter();
	const items = ['Home', 'Trainers', 'Socials', 'Reviews', 'About'];
	const [activeItem, setActiveItem] = useState(items[0]);
	const [loading, setLoading] = useState(true);
	const { logout, user } = useAuth();

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 2000)
		return () => clearTimeout(timer);
	}, []);

	const handleActiveItem = () => {

	}

	const componentMapping = {
		Home: <Home logout={logout} images={images_gym207} />,
		Trainers: <Text>Trainers</Text>,
		About: <About />,
		Socials: <Text>Socials</Text>,
		Reviews: <Text>Reviews</Text>,
	}

	return (
		<>
			{loading ?
				<PageLoading />
				:
				<SafeAreaView style={[container.wrapper, container.bg_white]}>
					<HorizontalPaddedView className=' h-fit'>
						<ScrollView showsVerticalScrollIndicator={false}>

							<MainGymHeader
								activeItem={activeItem}
								setActiveItem={setActiveItem}
								gym_title={'20/7 Gym'}
							/>

							{componentMapping[activeItem]}
						</ScrollView>

					</HorizontalPaddedView>
				</ SafeAreaView>}
		</>
	)
}


const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		padding: 30,
		borderRadius: 10
	},
})