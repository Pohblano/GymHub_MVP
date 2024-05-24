
import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import LottieView from 'lottie-react-native'


import balance from '../../assets/lottie/balance.json'
import triCircle from '../../assets/lottie/tri-circle.json'
import confetti from '../../assets/lottie/confetti.json'
import black_yellow_cirlces from '@/assets/lottie/black_yellow_circles.json'
import soundwave from '@/assets/lottie/soundwave.json'

export default function PageLoading() {
	return (
		<View style={styles.lottie_container}>
			<LottieView style={{ height: '100%', backgroundColor: 'white' }} source={soundwave} autoPlay loop />
		</View>
	)
}
// "rgb(231, 190, 96)"

231, 190, 96

const styles = StyleSheet.create({
	lottie_container: {
		display: 'flex',
		justifyContent: 'center',
		height: '100%',
		backgroundColor: 'white',
	}
})