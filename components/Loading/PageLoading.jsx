
import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'

import balance from '../../assets/lottie/balance.json'
import triCircle from '../../assets/lottie/tri-circle.json'
import confetti from '../../assets/lottie/confetti.json'
import black_yellow_cirlces from '@/assets/lottie/black_yellow_circles.json'
import yellow_circle from '@/assets/lottie/yellow_circle.json'

export default function PageLoading() {
	return (
		<View style={styles.lottie_container}>
			<LottieView style={{ height: '30%' }} source={yellow_circle} autoPlay loop />
		</View>
	)
} 

const styles = StyleSheet.create({
	lottie_container:{
    display: 'flex',
    justifyContent: 'center',
    height: '100%'
	}
})