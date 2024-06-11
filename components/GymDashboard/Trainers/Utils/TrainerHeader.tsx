// Modules
import React from 'react'
import { useNavigation } from 'expo-router'
import { DrawerNavigationProp} from "@react-navigation/drawer";
import { ParamListBase } from '@react-navigation/native';
import Animated, { SlideInLeft } from 'react-native-reanimated'
// Styling

import { useFadeInStyles } from '@/hooks/animationStyle';
// Components

import ScrollableNavBar from '@/components/Utils/ScrollableNavBar';


function TrainerHeader({activeItem, setActiveItem, items}:{
	
	activeItem: string,
	// setActiveItem:
	items: string[]
}
) {
	const { slideLeftStyle, slideUpStyle, fadeInStyle, scaleInStyle } = useFadeInStyles(50, -50, 800)
	const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

	return (
		<Animated.View className='flex-none' style={slideLeftStyle} >
			<ScrollableNavBar
				items={items}
				activeItem={activeItem}
				setActiveItem={setActiveItem} />
		</Animated.View >
	)
}

export default TrainerHeader