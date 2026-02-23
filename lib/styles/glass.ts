import { StyleSheet } from "react-native";

/**
 * Shared fallback styles for glass components on non-glass platforms.
 * Pass these to LiquidGlassAdapter's `fallbackStyle` prop.
 */
export const glassFallbackStyles = StyleSheet.create({
	/** Subtle border for buttons and interactive icon buttons */
	button: {
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.2)",
	},
	/** Card / container fallback with subtle border */
	card: {
		borderWidth: 1.5,
		borderColor: "rgba(0,0,0,0.15)",
	},
});
