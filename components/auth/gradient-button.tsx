import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { shadowPrimary } from "@/lib/theme";

type GradientButtonProps = {
	onPress: () => void;
	disabled?: boolean;
	loading?: boolean;
	loadingText?: string;
	icon?: ComponentProps<typeof SymbolView>["name"];
	children: string;
};

export function GradientButton({
	onPress,
	disabled = false,
	loading = false,
	loadingText = "Loading...",
	icon,
	children,
}: GradientButtonProps) {
	const isDisabled = disabled || loading;

	// useSharedValue lives on the UI thread — animates without going through JS
	const scale = useSharedValue(1);

	// useAnimatedStyle re-runs as a worklet whenever shared values change,
	// driving opacity and scale without triggering React re-renders
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: withTiming(isDisabled ? 0.5 : 1, { duration: 200 }),
		transform: [{ scale: scale.value }],
	}));

	return (
		// Plain Pressable handles gesture — onPressIn/Out drive the shared value
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			onPressIn={() => {
				scale.value = withTiming(0.97, { duration: 100 });
			}}
			onPressOut={() => {
				scale.value = withTiming(1, { duration: 150 });
			}}
		>
			{/* Animated.View wraps the visual so Reanimated can animate it */}
			<Animated.View style={[styles.button, animatedStyle]}>
				<LinearGradient
					colors={["#FF6B6B", "#FF5252"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.gradient}
				>
					{loading ? (
						<Text style={styles.text}>{loadingText}</Text>
					) : (
						<>
							<Text style={styles.text}>{children}</Text>
							{icon && <SymbolView name={icon} size={18} tintColor="#FFFFFF" />}
						</>
					)}
				</LinearGradient>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 9999,
		overflow: "hidden",
		...shadowPrimary,
	},
	gradient: {
		height: 56,
		borderRadius: 9999,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
	text: {
		fontSize: 17,
		fontWeight: "700",
		color: "#FFFFFF",
		letterSpacing: 0.3,
	},
});
