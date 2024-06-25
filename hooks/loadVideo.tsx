import { Asset } from "expo-asset";
import { useState, useEffect } from "react";

export const loadVideo = (asset: number) => {
	const [isVideoReady, setIsVideoReady] = useState(false);

	useEffect(() => {
		const preloadVideo = async () => {
			const videoAsset = Asset.fromModule(asset);
			await videoAsset.downloadAsync();
			setIsVideoReady(true);
		};

		preloadVideo();
	}, [isVideoReady]);

	return { isVideoReady }
}