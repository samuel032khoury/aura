import { BlurView } from "expo-blur";
import {
	type GlassStyle,
	GlassView,
	isLiquidGlassAvailable,
} from "expo-glass-effect";
import {
	type StyleProp,
	View,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import { useTheme } from "@/lib/theme";

/**
 * Glass effect support detection using expo-glass-effect API
 */
export const supportsGlassEffect = isLiquidGlassAvailable();

/**
 * Props for LiquidGlassAdapter component
 */
interface LiquidGlassAdapterProps extends ViewProps {
	children: React.ReactNode;
	/** Glass effect style - defaults to "regular" */
	glassEffectStyle?: GlassStyle;
	/** Tint color for the glass effect */
	tintColor?: string;
	/** Background color to use when glass/blur is not available */
	fallbackColor?: string;
	/** Additional styles to apply only to the fallback View */
	fallbackStyle?: StyleProp<ViewStyle>;
	/** Whether the glass view is interactive */
	isInteractive?: boolean;
	/** Use solid fallback instead of blur (for buttons with solid colors) */
	useSolidFallback?: boolean;
}

/**
 * Adapter that renders GlassView on iOS 26+, falls back to
 * BlurView on older iOS, and uses a solid View on Android/web.
 */
export function LiquidGlassAdapter({
	children,
	style,
	glassEffectStyle = "regular",
	tintColor,
	fallbackColor,
	fallbackStyle,
	isInteractive,
	useSolidFallback = false,
	...props
}: LiquidGlassAdapterProps) {
	const { colors, isDark } = useTheme();

	// iOS 26+ - use native liquid glass
	if (supportsGlassEffect) {
		return (
			<GlassView
				style={style}
				glassEffectStyle={glassEffectStyle}
				tintColor={tintColor}
				isInteractive={isInteractive}
				{...props}
			>
				{children}
			</GlassView>
		);
	}

	// Solid fallback (for colored buttons)
	if (useSolidFallback || fallbackColor) {
		return (
			<View
				style={[
					style,
					{ backgroundColor: fallbackColor ?? colors.surfaceVariant },
					fallbackStyle,
				]}
				{...props}
			>
				{children}
			</View>
		);
	}

	// Use BlurView for iOS < 26, solid View for Android/web
	if (process.env.EXPO_OS === "ios") {
		return (
			<BlurView
				tint={isDark ? "systemThickMaterial" : "systemMaterial"}
				intensity={80}
				style={[style, { overflow: "hidden" }, fallbackStyle]}
				{...props}
			>
				{children}
			</BlurView>
		);
	}

	// Android/web fallback with solid background
	return (
		<View
			style={[
				style,
				{
					backgroundColor: isDark
						? "rgba(255,255,255,0.08)"
						: "rgba(0,0,0,0.04)",
				},
				fallbackStyle,
			]}
			{...props}
		>
			{children}
		</View>
	);
}
