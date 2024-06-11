import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import Carousel from 'react-native-reanimated-carousel'
import { useFadeInStyles } from '@/hooks/animationStyle'


export default function LargeImageSlider({ images }: any) {
	const sliderImages = images.large_slider

	return (
		<Carousel
			loop
			width={wp(100) - 38}
			height={350}
			data={sliderImages}
			scrollAnimationDuration={250}
			renderItem={({ item }: { item: string }) => (
				<Image source={item} contentFit='cover' style={styles.image} />
			)} />
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '100%',
		borderRadius: 10,
	},
	image: {
		width: '99%',
		alignSelf: 'center',
		height: 350,
		borderRadius: 10,
	},
});
