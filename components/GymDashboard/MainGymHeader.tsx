// Modules
import React from 'react'
import { View, Text} from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import { DrawerNavigationProp, DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerActions, ParamListBase } from '@react-navigation/native';
import Animated from 'react-native-reanimated'
// Styling
import { text } from '@/styles/text.styles'
import { useFadeInStyles } from '@/hooks/animationStyle';
// Components
import { BoldText, RegularText } from '../Text/StyledText'
import ScrollableNavBar from '../Utils/ScrollableNavBar'
import CustomLink from '../Buttons/CustomLink';
import { FontAwesome } from '@expo/vector-icons';
import ScheduleStatus, { ScheduleType } from '../Utils/ScheduleStatus';

function MainGymHeader({ activeItem, setActiveItem, gym_title, items, schedule }: {
	activeItem: string,
	setActiveItem: (item:string) => any
	gym_title: string,
	items: string[],
	schedule: ScheduleType
}
) {
	const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
	const animation = useFadeInStyles(50, 50, 800, 0)
	const delayedAnimation = useFadeInStyles(50, 50, 800, 200)
	
	return (
		<Animated.View className='flex-none' >
			<CustomLink
				onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}
				onLongPress={() => { }}
				title={''}
				iconLeft={null}
				iconRight={<FontAwesome name="navicon" style={[text.black, text.large]} />}
				iconRightStyle={{}}
				style={{ display: 'flex', alignSelf: 'flex-end', marginBottom: 0 }}
				textStyle={{}}
				disabled={false}
				loading={false} />
			<View className='mb-2'>
				<RegularText style={[text.light_grey, text.small, animation.slideLeftStyle]}>{'This is'}</RegularText>
				<Animated.View className='d-flex flex-row' style={delayedAnimation.slideLeftStyle}>
					<BoldText style={[text.large]}>{gym_title}</BoldText>
					<ScheduleStatus business={'The gym'} schedule={schedule}/>
				</Animated.View>
			</View>

			<ScrollableNavBar
				items={items}
				activeItem={activeItem}
				setActiveItem={setActiveItem} />
		</Animated.View >
	)
}

export default MainGymHeader