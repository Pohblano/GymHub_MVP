
import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import LottieView from 'lottie-react-native'
import bubble_loading from '@/assets/lottie/bubble_loading.json'

export default function PageLoading() {
	return (
		<View style={styles.lottie_container}>
			<LottieView style={{ height: '30%', backgroundColor: 'white' }} source={bubble_loading} autoPlay loop />
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