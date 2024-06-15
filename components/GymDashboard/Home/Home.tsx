// Modules
import React, { useEffect, useRef, useState } from 'react'
import Animated, { FadeInDown, FadeInRight, FadeOut } from 'react-native-reanimated'
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
// Components
import GymHeroBanner from './Utils/GymHeroBanner'
import { GymBannerBody, GymBannerHeader} from './Utils/GymPromotions'
// Context
import { useGym } from '@/context/Gym.context'

function Home() {
	const { gym, updateGym } = useGym()
	const images = gym.images

	useEffect(()=>{
	},[])

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Animated.View className='flex-1 mb-3' entering={FadeInDown.duration(600).withInitialValues({ transform: [{ translateY: 50 }]}) } exiting={FadeOut}>
				<GymHeroBanner
					title={'Promotions'}
					subtitle={'Our latest'}
					details={gym.promotions.frontDetails}
					image={images?.promotions}
					textAnimation={FadeInRight.duration(800).delay(200)}
					linkAnimation={FadeInRight.duration(800).delay(400)} 
					bodyContentLength ={gym.promotions.list.length}
					bodyContent={
						<GymBannerBody list={gym.promotions.list} extraDetails={gym.promotions.extraDetails}/>
					}
					headerContent={
						<GymBannerHeader title={gym.promotions.title} subtitle={gym.promotions.subtitle}/>
					}/>
					
			</Animated.View>

			<Animated.View className='flex-1 mb-3' entering={FadeInDown.duration(800).delay(200).withInitialValues({ transform: [{ translateY: 50 }] })} exiting={FadeOut}>
				<GymHeroBanner
					title={'Memberships'}
					subtitle={'All access'}
					details={gym.memberships.frontDetails}
					image={images?.memberships}
					textAnimation={FadeInRight.duration(800).delay(500)}
					linkAnimation={FadeInRight.duration(800).delay(700)} 
					bodyContentLength ={gym.memberships.list.length}
					bodyContent={
						<GymBannerBody list={gym.memberships.list} extraDetails={gym.memberships.extraDetails} />
					}
					headerContent={
						<GymBannerHeader title={gym.memberships.title} subtitle={gym.memberships.subtitle} />
					}/>
			</Animated.View>
		</ScrollView>
	)
}

export default Home
