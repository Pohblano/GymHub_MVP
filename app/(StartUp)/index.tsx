import React, {useEffect} from 'react';
import {View, Text} from '../../components/Themed'
import { Stack, useNavigation } from 'expo-router';


export default function StartUpScreen(){
	const navigation = useNavigation();

	useEffect(()=>{
		navigation.setOptions({ headerShown: false});
		
	}, [navigation])

	return (
		// <View className="bg-red-50">
		// 	<Text>Hi there</Text>
		// </View>
		<View>
			<Text>Hi there</Text>	
		</View>
		

			// <Text className='text-blue'>Start Up</Text>
	
	)
}
