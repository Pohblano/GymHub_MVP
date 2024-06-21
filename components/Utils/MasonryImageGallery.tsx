import { sequentialStyles } from '@/hooks/sequentialAnimationStyles';
import React, { useEffect, useState } from 'react'
import { Pressable, Image as RNImage, StyleSheet, Text} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image'
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from '@react-navigation/native';

export default function MasonryImageGallery({ images, style }: {
	images: string[],
	style: any
}) {
	const { navigate } = useNavigation()
	const sequentialSlideUpStyle = sequentialStyles(images, 50, 200, 0, 0)

	const renderItem = ({ item, i }: {
		item: string,
		i: number
	}
	) => {
		const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
		const getImageSize = (height: number, width: number) => {
			if (width > height) return 250
			else if (width < height) return 300
			else return 200
		}
		useEffect(() => {
			RNImage.getSize(item, (width, height) => {
				setDimensions({ width, height: getImageSize(height, width) });
			});
		}, [item]);

		return (
			<Animated.View style={[sequentialSlideUpStyle[i].slideInStyle]}>
				<Pressable onPress={() => navigate('ImageViewerScreen', { index: i, images: images })}>
					<Image source={{ uri: item }} style={[{ height: dimensions.height }, styles.image]} transition={100} />
				</Pressable>
			</Animated.View>
		)
	};

	return (
		<MasonryList
			data={images}  /// Change to trainer images
			numColumns={2}
			renderItem={({ item, i }: { item: any, i: number }) => renderItem({ item, i })}
			style={style}
			contentContainerStyle={styles.masonryList} />
	)
}
const styles = StyleSheet.create({
	image: {
		height: 200,
		alignSelf: 'stretch',
		borderRadius: 8,
		margin: 3
	},
	masonryList: {
		alignSelf: 'stretch',
	},
	fullscreenImage: {
		width: '100%',
		height: '100%',
	},
});