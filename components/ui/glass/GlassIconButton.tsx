import type { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";

import { LiquidGlassAdapter } from "@/components/ui/adapter/liquid-glass-adapter";
import { hapticButtonPress } from "@/lib/haptics";
import { glassFallbackStyles } from "@/lib/styles/glass";

interface GlassIconButtonProps {
	/** The icon content to display inside the button */
	icon: ReactNode;
	/** Handler called when the button is pressed */
	onPress: () => void;
	/** Size of the button in pixels (default: 44) */
	size?: number;
	/** Background color for the fallback (non-glass) rendering */
	fallbackColor?: string;
}

/**
 * A circular glass-effect button that displays an icon.
 * Used as the base component for GlassBackButton, GlassCloseButton,
 * and GlassNavButton.
 */
export function GlassIconButton({
	icon,
	onPress,
	size = 44,
	fallbackColor,
}: GlassIconButtonProps) {
	const handlePress = () => {
		hapticButtonPress();
		onPress();
	};

	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
		>
			<LiquidGlassAdapter
				style={[
					styles.button,
					{ width: size, height: size, borderRadius: size / 2 },
				]}
				isInteractive
				fallbackColor={fallbackColor}
				fallbackStyle={glassFallbackStyles.button}
			>
				{icon}
			</LiquidGlassAdapter>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
	},
});
