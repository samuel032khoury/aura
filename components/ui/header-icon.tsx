import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

interface HeaderIconProps {
	/** Icon name from Ionicons */
	icon: keyof typeof Ionicons.glyphMap;
	/** Optional custom icon color (defaults to primary) */
	iconColor?: string;
	/** Optional custom background color (defaults to primaryContainer) */
	backgroundColor?: string;
	/** Size variant - "small" (48px) or "large" (80px) */
	size?: "small" | "large";
}

/**
 * A reusable header icon component for onboarding and auth screens.
 * Displays an icon in a circular container with subtle background.
 *
 * @example
 * ```tsx
 * <HeaderIcon icon="hand-left-outline" />
 * ```
 */
export function HeaderIcon({
	icon,
	iconColor,
	backgroundColor,
	size = "small",
}: HeaderIconProps) {
	const { colors } = useTheme();

	const containerSize = size === "large" ? 80 : 56;
	const iconSize = size === "large" ? 40 : 28;

	return (
		<View
			style={{
				width: containerSize,
				height: containerSize,
				borderRadius: containerSize / 2,
				backgroundColor: backgroundColor ?? colors.primaryContainer,
				justifyContent: "center",
				alignItems: "center",
				marginBottom: 16,
			}}
		>
			<Ionicons
				name={icon}
				size={iconSize}
				color={iconColor ?? colors.primary}
			/>
		</View>
	);
}
