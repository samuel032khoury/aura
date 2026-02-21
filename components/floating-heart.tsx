import { SymbolView } from "expo-symbols";
import React from "react";
import Animated, {
	FadeIn,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";

export const FloatingHeart = ({
	size,
	top,
	left,
	delay,
	opacity,
}: {
	size: number;
	top: number;
	left: number;
	delay: number;
	opacity: number;
}) => {
	const translateY = useSharedValue(0);

	React.useEffect(() => {
		translateY.value = withRepeat(
			withSequence(
				withTiming(-10, { duration: 2000 }),
				withTiming(10, { duration: 2000 }),
			),
			-1,
			true,
		);
	}, [translateY]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	return (
		<Animated.View
			entering={FadeIn.delay(delay).duration(1000)}
			style={[
				{
					position: "absolute",
					top,
					left,
					opacity,
				},
				animatedStyle,
			]}
		>
			<SymbolView name="heart.fill" size={size} tintColor="#FF6B6B" />
		</Animated.View>
	);
};
