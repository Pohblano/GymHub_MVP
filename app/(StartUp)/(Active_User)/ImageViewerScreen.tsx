import {
	RouteProp,
	useNavigation,
	useRoute,
	useIsFocused,
	NavigationProp,
} from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import AwesomeGallery, {
	GalleryRef,
	RenderItemInfo,
} from 'react-native-awesome-gallery';
import * as React from 'react';
import { Image } from 'expo-image';
import Animated, {
	FadeInDown,
	FadeInUp,
	FadeOutDown,
	FadeOutUp,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const renderItem = ({
	item,
	setImageDimensions,
}: RenderItemInfo<{ uri: string }>) => {
	return (
		<Image
			source={item.uri}
			style={StyleSheet.absoluteFillObject}
			contentFit="contain"
			onLoad={(e) => {
				const { width, height } = e.source;
				setImageDimensions({ width, height });
			}}
		/>
	);
};

export default function ImageViewerScreen() {
	const { top, bottom } = useSafeAreaInsets();
	const { setParams, goBack } = useNavigation()
	const isFocused = useIsFocused();
	const { params } = useRoute();
	const gallery = useRef<GalleryRef>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const [infoVisible, setInfoVisible] = useState(true);

	useEffect(() => {
		StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
		if (!isFocused) {
			StatusBar.setHidden(false, 'fade');
		}
	}, [isFocused]);

	const onIndexChange = useCallback(
		(index: number) => {
			isFocused && setParams({ index });
		},
		[isFocused, setParams]
	);

	const onTap = () => {
		StatusBar.setHidden(infoVisible, 'slide');
		setInfoVisible(!infoVisible);
	};

	return (
		<View style={styles.container}>
			{infoVisible && (
				<Animated.View
					entering={mounted ? FadeInUp.duration(250) : undefined}
					style={[
						styles.toolbar,
						{
							height: top + 60,
							paddingTop: top,
						},
					]}>
					<View style={styles.textContainer}>
						<Pressable onPress={goBack} style={{ justifyContent: 'flex-start' }}>
							<MaterialIcons className="ml-4" name="arrow-back-ios" size={32} color="white" />
						</Pressable>
					</View>
				</Animated.View>
			)}
			<AwesomeGallery
					ref={gallery}
					data={params.images.map((uri) => ({ uri }))}
					keyExtractor={(item) => item.uri}
					renderItem={renderItem}
					initialIndex={params.index}
					numToRender={3}
					doubleTapInterval={150}
					onIndexChange={onIndexChange}
					onTap={onTap}
					onScaleEnd={(scale) => {
						if (scale < 0.8) {
							goBack();
						}
					}}/>
			{infoVisible && (
				<Animated.View
					entering={mounted ? FadeInDown.duration(250) : undefined}
					style={[
						styles.toolbar,
						styles.bottomToolBar,
						{
							height: bottom + 100,
							paddingBottom: bottom,
						},
					]}>
					<Text style={styles.headerText}>
						{params.index + 1} of {params.images.length}
					</Text>
				</Animated.View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		// justifyContent: 'space-around'
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	toolbar: {
		position: 'absolute',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	bottomToolBar: {
		bottom: 0,
	},
	headerText: {
		fontSize: 16,
		color: 'white',
		fontWeight: '600',
	},
});