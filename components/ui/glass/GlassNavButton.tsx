import { Ionicons } from "@expo/vector-icons";

import { GlassIconButton } from "./GlassIconButton";

interface GlassNavButtonProps {
	direction: "left" | "right";
	onPress: () => void;
	size?: number;
	iconSize?: number;
	iconColor?: string;
}

/**
 * A circular navigation button with glass effect for photo galleries.
 *
 * @example
 * ```tsx
 * <GlassNavButton
 *   direction="left"
 *   onPress={() => handlePhotoTap("left")}
 * />
 * ```
 */
export function GlassNavButton({
	direction,
	onPress,
	size = 36,
	iconSize = 18,
	iconColor = "#FFFFFF",
}: GlassNavButtonProps) {
	const iconName = direction === "left" ? "chevron-back" : "chevron-forward";

	return (
		<GlassIconButton
			icon={<Ionicons name={iconName} size={iconSize} color={iconColor} />}
			onPress={onPress}
			size={size}
			fallbackColor="rgba(0,0,0,0.4)"
		/>
	);
}
