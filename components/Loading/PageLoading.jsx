
import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import LottieView from 'lottie-react-native'
import soundwave from '@/assets/lottie/soundwave.json'

export default function PageLoading() {
	return (
		<View style={styles.lottie_container}>
			<LottieView style={{ height: '100%', backgroundColor: 'white' }} source={soundwave} autoPlay loop />
		</View>
	)
}


const styles = StyleSheet.create({
	lottie_container: {
		display: 'flex',
		justifyContent: 'center',
		height: '100%',
		backgroundColor: 'white',
	}
})