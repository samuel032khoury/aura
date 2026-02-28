import { Pressable, StyleSheet, Text, View } from "react-native";

import { LiquidGlassAdapter } from "@/components/ui/adapter/liquid-glass-adapter";
import { hapticButtonPress } from "@/lib/haptics";
import { glassFallbackStyles } from "@/lib/styles/glass";
import { useTheme } from "@/lib/theme";

interface GlassButtonProps {
	onPress: () => void;
	label: string;
	disabled?: boolean;
	variant?: "primary" | "glass";
}

export function GlassButton({
	onPress,
	label,
	disabled = false,
	variant = "primary",
}: GlassButtonProps) {
	const { colors } = useTheme();

	const handlePress = () => {
		if (!disabled) {
			hapticButtonPress();
			onPress();
		}
	};

	const labelElement = (
		<Text style={{ fontSize: 17, fontWeight: "600", color: "#FFFFFF" }}>
			{label}
		</Text>
	);

	// Primary variant — solid color button
	if (variant === "primary") {
		return (
			<Pressable
				onPress={handlePress}
				disabled={disabled}
				style={({ pressed }) => ({
					opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
					transform: pressed ? [{ scale: 0.98 }] : [],
				})}
			>
				<View style={[styles.button, { backgroundColor: colors.primary }]}>
					{labelElement}
				</View>
			</Pressable>
		);
	}

	// Glass variant — delegates fallback to LiquidGlassAdapter
	return (
		<Pressable
			onPress={handlePress}
			disabled={disabled}
			style={({ pressed }) => ({
				opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
				transform: pressed ? [{ scale: 0.98 }] : [],
			})}
		>
			<LiquidGlassAdapter
				style={styles.button}
				isInteractive
				useSolidFallback
				fallbackColor="rgba(255,255,255,0.2)"
				fallbackStyle={glassFallbackStyles.button}
			>
				{labelElement}
			</LiquidGlassAdapter>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 56,
		borderRadius: 28,
		borderCurve: "continuous",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
		overflow: "hidden",
	},
});
