import type { ViewStyle } from "react-native";

/**
 * Shared shadow styles using CSS boxShadow.
 * Use these instead of defining shadows inline for consistency.
 */

/** Small shadow for subtle elevation */
export const shadowSmall: ViewStyle = {
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

/** Medium shadow for cards and buttons */
export const shadowMedium: ViewStyle = {
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
};

/** Large shadow for modals and overlays */
export const shadowLarge: ViewStyle = {
	boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
};

/** Primary accent shadow for CTA buttons and logo */
export const shadowPrimary: ViewStyle = {
	boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
};
