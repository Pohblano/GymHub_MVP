import { MediumText, RegularText, SemiBoldText } from '@/components/Text/StyledText'
import { IconBenchPress, IconDumbells, IconExerciseBike, IconPunchingBag, IconSupplements } from '@/constants/Icons'
import { text } from '@/styles/text.styles'
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

// TYPES
type Amenity = keyof typeof gym_ammenities;
interface AmenitiesMap {
	'wifi': React.JSX.Element,
	'showers': React.JSX.Element,
	'storage': React.JSX.Element,
	'restrooms': React.JSX.Element
}

type Equipment = keyof typeof gym_equipments;
interface EquipmentMap {
	'dumbells': React.JSX.Element,
	'weight_machines': React.JSX.Element,
	'supplements': React.JSX.Element,
	'cardio_machines': React.JSX.Element,
	'punching_bag': React.JSX.Element,
	'stand': React.JSX.Element
}

// ICON MAPS
const gym_ammenities: AmenitiesMap = {
	'wifi': <FontAwesome6 name="wifi" size={24} color="#454545" />,
	'showers': <FontAwesome6 name="shower" size={24} color="#454545" />,
	'storage': <MaterialCommunityIcons name="locker" size={30} color="#454545" />,
	'restrooms': <FontAwesome5 name="restroom" size={24} color="#454545" />
}

const gym_equipments: EquipmentMap = {
	'dumbells': <IconDumbells height={30} iconStyle={{}} />,
	'weight_machines': <IconBenchPress height={35} iconStyle={{}} />,
	'supplements': <IconSupplements height={24} width={25} iconStyle={{}} />,
	'cardio_machines': <IconExerciseBike height={24} width={25} iconStyle={{}} />,
	'punching_bag': <IconPunchingBag height={24} iconStyle={{}} />,
	'stand': <MaterialCommunityIcons name="storefront-outline" size={24} color="black" />
}


export function GymBiography({ bio }: {
	bio: string
}) {
	return (
		<MediumText style={[{ marginTop: 30 }, text.regular]}>{bio}</MediumText>
	)
}

export function GymAllEquipment({ list }: {
	list: {
		title: string,
		description: string,
		icon: string
	}[]
}) {
	return (
		<>
			{list.map((
				item: {
					title: string,
					description: string,
					icon: string
				},
				index: number
			) => {
				return <GymEquipment key={index} title={item.title} description={item.description} icon={gym_equipments[item.icon as Equipment]} />
			})}
		</>
	)
}


function GymEquipment({ title, description, icon }: {
	title: string,
	description: string,
	icon: React.JSX.Element
}) {
	return (
		<View className='d-flex flex-row gap-4' style={{ marginTop: 30 }}>
			<View style={{width: 30}}>
				{icon}
			</View>
			<View style={{ width: '100%' }}>
				<SemiBoldText className='mb-2' style={[text.black, text.sub_heading]}>{title}</SemiBoldText>
				<RegularText style={[text.light_grey, text.regular, {}]}>{description}</RegularText>
			</View>
		</View>

	)
}

export function GymAmenities({ list }: {
	list: {
		title: string,
		icon: string
	}[]
}) {
	return (
		<>
			<SemiBoldText className='mb-1' style={[text.sub_heading]}>{'Amenities'}</SemiBoldText>
			{list.map((
				item: {
					icon: string,
					title: string
				},
				index
			) => {
				return <GymAmenity key={index} title={item.title} icon={gym_ammenities[item.icon as Amenity]} />
			})}
		</>
	)
}

function GymAmenity({ title, icon }: {
	title: string,
	icon: React.JSX.Element
}) {
	return (
		<View className="d-flex flex-row " style={{ marginTop: 30, gap: 15 }}>
			<View style={{width: 30}}>
				{icon}
			</View>
			<RegularText style={[text.sub_heading, text.black,]}>{title}</RegularText>
		</View>
	)
}


