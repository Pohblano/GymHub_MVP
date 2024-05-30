import { MediumText, RegularText, SemiBoldText } from '@/components/Text/StyledText'
import { text } from '@/styles/text.styles'
import React from 'react'
import { View } from 'react-native'

export function GymBiography({ bio }: {
	bio:string
}) {
	return (
		<MediumText style={[{ marginTop: 30 }, text.regular]}>{bio}</MediumText>
	)
}

export function GymAllEquipment({list}:{
	list: {title: string, description: string}[]
}){
	return(
		<>
			{list.map((
				item: { title: string, description: string }, 
				index: number 
			)=> {
				return <GymEquipment key={index} title={item.title} description={item.description} />
			})}
		</>
	)
}


function GymEquipment({ title, description }:{
	title:string,
	description: string
}) {
	return (
		<View style={{ marginTop: 30 }}>
			<SemiBoldText className='mb-2' style={[text.black, text.sub_heading]}>{title}</SemiBoldText>
			<RegularText style={[text.light_grey, text.regular]}>{description}</RegularText>
		</View>
	)
}

export function GymAmenities({list}: {
	list: {title: string}[]
}){
	return(
		<>
			<SemiBoldText className='mb-1' style={[text.black, text.sub_heading]}>{'Amenities'}</SemiBoldText>
			{list.map((
				item: { title: string }, 
				index: number
			)=> {
				return <GymAmenity key={index} title={item.title}/>
			})}
		</>
	)
}

function GymAmenity({title}: {
	title: string
}){
	return(
		<View className="d-flex flex-row " style={{marginTop: 30}}>
			<RegularText style={[text.sub_heading, text.black]}>{title}</RegularText>
		</View>
	)
}