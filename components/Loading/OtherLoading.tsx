import {Text, View} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import soundwave from '@/assets/lottie/soundwave.json'

export default function Loading({size}){
	return(
		<View style={{height: size, aspectRatio: 1}}> 
			<LottieView style={{flex: 1}} source={soundwave} autoPlay loop  />
		</View>
	)
} 