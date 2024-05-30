import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { useSharedValue } from "react-native-reanimated";
import Carousel from 'react-native-reanimated-carousel'

import { images_gym207 } from '@/constants/Gym207.images'

export default function LargeImageSlider() {
	const images = images_gym207.large_slider

	return (
		<View style={{  height: 350, alignContent: 'flex-start', display: 'flex' }}>
			<Carousel
				loop
				width={wp(100) - 38}
				height={350}
				data={images}
				scrollAnimationDuration={250}
				mode="parallax"
				style={{}}
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				renderItem={({ item }) => (
					<Image source={{ uri: item }} resizeMode='cover' style={styles.image} />
				)}
			/>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#fff',
		width: '100%',
		borderRadius: 10,
	},
	image: {
		width: '100%',
		height: 350,
		borderRadius: 10,
	},
});
