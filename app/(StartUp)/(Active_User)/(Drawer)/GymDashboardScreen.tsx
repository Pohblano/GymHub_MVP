// Modules
import React, { useState, useRef } from 'react'
import { Text, } from 'react-native'
import PagerView from 'react-native-pager-view';
// * Routing
import { useRouter } from 'expo-router'
// Styling
import { container } from '@/styles/containers.styles'
// Components
import { CustomSafeAreaView, HorizontalPaddedView } from '@/components/Views/PaddedView'
import MainGymHeader from '@/components/GymDashboard/MainGymHeader'
import Home from '@/components/GymDashboard/Home/Home'
import About from '@/components/GymDashboard/About/About'
import Trainers from '@/components/GymDashboard/Trainers/Trainers'
import Socials from '@/components/GymDashboard/Socials/Socials'
// Context
import { useGym } from '@/context/Gym.context'

interface ComponentMap {
	Home: React.JSX.Element;
	Trainers: React.JSX.Element;
	About: React.JSX.Element;
	Socials: React.JSX.Element;
	Reviews: React.JSX.Element;
}
type ActiveComponent = keyof ComponentMap;

export default function GymDashboardScreen() {
	const items = ['Home', 'Trainers', 'About', 'Socials',];
	const [activeItem, setActiveItem] = useState(items[0]);
	const { gym } = useGym();
	const pagerViewRef = useRef<PagerView>(null);

	// const handlePageChange = (index: number) => {
	// 	setActiveItem(items[index]);
	// }

	const handleNavigationChange = (item: string) => {
		setActiveItem(item);
		const index = items.indexOf(item);
		pagerViewRef.current?.setPage(index);
	}

	const dashboardMapping: ComponentMap = {
		Home: <Home />,
		Trainers: <Trainers />,
		Socials: <Socials user={'gym'} />,
		About: <About />,
		Reviews: <Text>Reviews</Text>,
	}

	return (

		<CustomSafeAreaView style={[container.wrapper, container.bg_white]}>
			<HorizontalPaddedView>

				<MainGymHeader
					activeItem={activeItem}
					items={items}
					setActiveItem={handleNavigationChange}
					gym_title={gym.name}
					schedule={gym.schedule} />

				{dashboardMapping[activeItem as ActiveComponent]}

			</HorizontalPaddedView>
		</CustomSafeAreaView>

	)
}
