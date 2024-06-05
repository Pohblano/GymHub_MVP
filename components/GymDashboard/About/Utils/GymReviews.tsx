// Modules
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
// Styles
import { text } from '@/styles/text.styles'

// Components
import { MediumText, RegularText, SemiBoldText } from '@/components/Text/StyledText'
import DisplayStarRating from '@/components/Utils/DisplayStarRating'
import Carousel from 'react-native-reanimated-carousel'
import ReadMore from 'react-native-read-more-text'

interface ReviewProps {
	uid?: string,
	name?: string,
	description?: string,
	rating?: number
}

interface CarouselProps {
	item: ReviewProps,
	index: number,
	animationValue: {}
}

export default function GymReviews({ rating, reviews }: {
	rating: number,
	reviews: ReviewProps[]
}) {

	const [expanded, setExpanded] = useState(false);
	const [carouselHeight, setCarouselHeight] = useState(300)

	useEffect(() => {
	}, [])
	return (
		<View className='d-flex flex-col' style={{ marginTop: 30 }}>

			<SemiBoldText className='mb-6' style={[text.sub_heading,]}>{'Google Reviews'}</SemiBoldText>
			<View style={Styles.carousel_wrapper}>
				<Carousel
					autoPlay
					loop
					width={wp(100) - 38}
					height={carouselHeight}
					data={reviews}
					scrollAnimationDuration={250}
					style={{}}
					renderItem={(data) =>
						<Item data={data} />
					}
				/>
			</View>

		</View>
	)
}

const Item = ({ data }: {
	data: CarouselProps
}) => {
	const { name, description, rating } = data.item

	const renderTruncatedFooter = (handlePress) => {
		return (
			<Text style={{ color: '#528eff', marginTop: 5 }} onPress={() => { handlePress();  }}>
				Read more
			</Text>
		)
	}

	const renderRevealedFooter = (handlePress) => {

		return (
			<Text style={{ color: '#528eff', marginTop: 5 }} onPress={() => { handlePress();  }}>
				Show less
			</Text>
		)
	}


	return (
		<View className='p-5 h-80'>
			<MediumText className='mb-1' style={text.sub_heading}>{name}</MediumText>
			<DisplayStarRating rating={rating} style={{ marginBottom: 18 }} />
			<ReadMore
				numberOfLines={4}
				renderTruncatedFooter={renderTruncatedFooter}
				renderRevealedFooter={renderRevealedFooter}
			>
				<RegularText style={[text.black, { overflow: 'scroll', flex: 1 }]} >{description}</RegularText>
			</ReadMore>
		</View>
	)
}

const Styles = StyleSheet.create({
	carousel_wrapper: {
		flex: 1,
		height: '100%',
		alignContent: 'flex-start',
		display: 'flex',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#BDBDBD',
	}
})
