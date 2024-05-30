import React from 'react'
import { View } from 'react-native'
// Styling
import { text } from '@/styles/text.styles'
// Components
import { RegularText, SemiBoldText } from '@/components/Text/StyledText'

export default function GymLocation({address}: {
	address: string
}){
	return(
		<View style={{marginTop: 30}}>
			<SemiBoldText className='mb-5' style={[text.black, text.sub_heading]}>Location</SemiBoldText>
			<RegularText className='mb-3' style={[text.black, text.sub_heading]}>{address}</RegularText>
			

		</View>
	)
}