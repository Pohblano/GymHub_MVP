// Modules
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, Text, StyleSheet} from 'react-native'
import PagerView from 'react-native-pager-view';
// * Routing
import { useRouter } from 'expo-router'
// Styling
import { container } from '@/styles/containers.styles'
// Components
import { HorizontalPaddedView } from '@/components/Views/PaddedView'
import PageLoading from '@/components/Loading/PageLoading'
import MainGymHeader from '@/components/GymDashboard/MainGymHeader'
import Home from '@/components/GymDashboard/Home/Home'
import About from '@/components/GymDashboard/About/About'
import Trainers from '@/components/GymDashboard/Trainers/Trainers'
import Socials from '@/components/GymDashboard/Socials/Socials'
// Context
import { useAuth } from '@/context/Auth.context'
import { useGym, GymContextProvider } from '@/context/Gym.context'


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
	const items = ['Home', 'Trainers', 'Socials', 'About'];
	const [activeItem, setActiveItem] = useState(items[0]);
	const [loading, setLoading] = useState(true);
	const { logout, user } = useAuth();
	const { gym, gymsList } = useGym();

	const pagerViewRef = useRef<PagerView>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 2000)
		return () => clearTimeout(timer);

	}, []);

	const handlePageChange = (index: number) => {
		setActiveItem(items[index]);
	  }
	
	  const handleNavigationChange = (item: string) => {
		setActiveItem(item);
		const index = items.indexOf(item);
		pagerViewRef.current?.setPage(index);
	  }
	

	const componentMapping: ComponentMap = {
		Home: <Home logout={logout} />,
		Trainers: <Trainers />,
		Socials: <Socials/>,
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
						
							<MainGymHeader
								activeItem={activeItem}
								// setActiveItem={setActiveItem}
								setActiveItem={handleNavigationChange}
								gym_title={gym.name}
							/>
{/* 
							<PagerView 
								ref={pagerViewRef}
								initialPage={0}
								style={{ flex: 1 }}
								onPageSelected={e => handlePageChange(e.nativeEvent.position)}
								scrollEnabled={true}
								>
								<Home logout={logout} key={'1'}/>
								<Trainers key={'2'}/>
								<Socials key={'3'}/>
								<About key={'4'}/>
							</PagerView>  */}
							{componentMapping[activeItem as Active]}

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