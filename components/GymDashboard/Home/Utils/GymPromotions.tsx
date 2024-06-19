import React from 'react'
import { View } from 'react-native'
import { BoldText, LightText, RegularText, SemiBoldText } from '@/components/Text/StyledText'
import { text } from '@/styles/text.styles'
import { useGym } from '@/context/Gym.context'


interface BannerItemType {
	title: string,
	details: string,
	price: string
}

export function GymBannerHeader({ title, subtitle }: {
	title: string,
	subtitle: string,

}) {
	return (
		<>
			<RegularText className="mt-2 ml-1" style={[text.white]}>{subtitle}</RegularText>
			<BoldText style={[text.large, text.white]}>{title}</BoldText>
		</>
	)
}

export function GymBannerBody({ list, extraDetails }: {
	list: BannerItemType[],
	extraDetails: string
}) {
	const {gym} = useGym()
	return (
		<>
			{list.map((promotion, index) => 
				<View style={{marginBottom: 20}} key={index}>
					<SemiBoldText style={[text.small, text.white]}>{promotion.title}</SemiBoldText>
					{promotion.details? <LightText style={[text.white, { fontSize: 12 }]}>{promotion.details}</LightText>: null}
					<RegularText style={[text.sub_heading, {marginTop: 10, color: gym.theme.text}]}>
						{promotion.price}
					</RegularText>
				</View>
			)}
			
			<LightText style={[text.white, { marginTop:20}]}>{extraDetails}</LightText>
		</>
	)
}

