import {Text, View} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

export default function Loading({size}){
	return(
		<View style={{height: size, aspectRatio: 1}}> 
			<LottieView style={{flex: 1}} source={require('../assets/lottie/balance.json')} autoPlay loop  />
		</View>
	)
} 