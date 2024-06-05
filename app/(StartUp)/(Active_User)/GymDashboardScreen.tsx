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
import Trainers from '@/components/GymDashboard/Trainers/Trainers'
// Context
import { useAuth } from '@/context/Auth.context'
import { useGym, GymContextProvider } from '@/context/Gym.context'



import PagerView from 'react-native-pager-view';
import CuratorIOFeed from '@/components/GymDashboard/Socials/CuratorFeed'


interface ComponentMap {
	Home: React.JSX.Element;
	Trainers: React.JSX.Element;
	About: React.JSX.Element;
	Socials: React.JSX.Element;
	Reviews: React.JSX.Element;
}

// Wrap context to access Gym context
export default function GymDashboardWrapper() {
	return (
		<GymContextProvider>
			<GymDashboardScreen />
		</GymContextProvider>
	)
}

function GymDashboardScreen() {
	const router = useRouter();
	const items = ['Home', 'Trainers', 'Socials', 'Reviews', 'About'];
	const [activeItem, setActiveItem] = useState(items[0]);
	const [loading, setLoading] = useState(true);
	const { logout, user } = useAuth();
	const { gym, gymsList } = useGym();

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 2000)
		return () => clearTimeout(timer);

	}, []);

	const handleActiveItem = () => {

	}

	const componentMapping: ComponentMap = {
		Home: <Home logout={logout} />,
		Trainers: <Trainers />,
		Socials: <CuratorIOFeed/>,
		About: <About />,
		Reviews: <Text>Reviews</Text>,
	}
	type Active = keyof typeof componentMapping;

	return (
		<>
			{loading ?
				<PageLoading />
				:
				<SafeAreaView style={[container.wrapper, container.bg_white]}>
					<HorizontalPaddedView>
						{/* <ScrollView showsVerticalScrollIndicator={false}> */}

							<MainGymHeader
								activeItem={activeItem}
								setActiveItem={setActiveItem}
								gym_title={gym.name}
							/>

							 {/* <PagerView initialPage={0} style={{flex: 1}} scrollEnabled={true}>
								<Home logout={logout} key={'1'}/>
								<Trainers key={'2'}/>
								<About key={'3'}/>
								<CuratorIOFeed key={'4'}/>
							</PagerView>  */}
							{componentMapping[activeItem as Active]}
						{/* </ScrollView> */}

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