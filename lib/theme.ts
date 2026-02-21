import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { Platform, useColorScheme } from "react-native";

// Spark app primary color - a warm, romantic pink/coral
export const SEED_COLOR = "#FF6B6B";

// Custom color palette for the dating app
export const AppColors = {
	primary: "#FF6B6B",
	secondary: "#4ECDC4",
	accent: "#FFE66D",
	like: "#4CD964",
	reject: "#FF3B30",
	match: "#FF2D55",
	background: {
		light: "#FFFFFF",
		dark: "#000000",
	},
	surface: {
		light: "#F8F9FA",
		dark: "#1C1C1E",
	},
	text: {
		light: "#000000",
		dark: "#FFFFFF",
	},
	textSecondary: {
		light: "#6C757D",
		dark: "#8E8E93",
	},
};

export const AuthPalette = {
	light: {
		gradient: ["#FFF5F5", "#FFE8E8", "#FFF0F0", "#FFFFFF"] as const,
		surface: "#FFFFFF",
		inputBg: "#F8F8F8",
		inputBgFocused: "#FFFFFF",
		textPrimary: "#1A1A1A",
		textSecondary: "#888888",
		textTertiary: "#666666",
		placeholder: "#AAAAAA",
		iconDefault: "#999999",
		accentLink: "#FF6B6B",
		errorBg: "rgba(220, 38, 38, 0.08)",
		errorText: "#DC2626",
		heartOpacity: [0.15, 0.12, 0.1, 0.08] as const,
	},
	dark: {
		gradient: ["#1A1216", "#161014", "#130F12", "#0E0D0F"] as const,
		surface: "#0E0D0F",
		inputBg: "#201C20",
		inputBgFocused: "#2C2630",
		textPrimary: "#F2ECF0",
		textSecondary: "#9A9298",
		textTertiary: "#7A747A",
		placeholder: "#6A6068",
		iconDefault: "#7A7078",
		accentLink: "#FF8A8A",
		errorBg: "rgba(255, 107, 107, 0.12)",
		errorText: "#FF8A8A",
		heartOpacity: [0.2, 0.16, 0.14, 0.12] as const,
	},
} as const;

export const shadowPrimary = Platform.select({
	ios: {
		shadowColor: "#FF6B6B",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
	},
	android: {
		elevation: 8,
	},
}) as object;

export type AuthTheme = (typeof AuthPalette)["light"] | (typeof AuthPalette)["dark"];

export function useAuthTheme(): AuthTheme {
	const colorScheme = useColorScheme();
	return colorScheme === "dark" ? AuthPalette.dark : AuthPalette.light;
}

export function useAppTheme() {
	const colorScheme = useColorScheme();
	const { theme } = useMaterial3Theme({ sourceColor: SEED_COLOR });

	const isDark = colorScheme === "dark";

	return {
		isDark,
		theme,
		colors: {
			// Material 3 colors
			primary: isDark ? theme.dark.primary : theme.light.primary,
			onPrimary: isDark ? theme.dark.onPrimary : theme.light.onPrimary,
			primaryContainer: isDark
				? theme.dark.primaryContainer
				: theme.light.primaryContainer,
			onPrimaryContainer: isDark
				? theme.dark.onPrimaryContainer
				: theme.light.onPrimaryContainer,
			secondary: isDark ? theme.dark.secondary : theme.light.secondary,
			onSecondary: isDark ? theme.dark.onSecondary : theme.light.onSecondary,
			background: isDark ? theme.dark.background : theme.light.background,
			onBackground: isDark ? theme.dark.onBackground : theme.light.onBackground,
			surface: isDark ? theme.dark.surface : theme.light.surface,
			onSurface: isDark ? theme.dark.onSurface : theme.light.onSurface,
			surfaceVariant: isDark
				? theme.dark.surfaceVariant
				: theme.light.surfaceVariant,
			onSurfaceVariant: isDark
				? theme.dark.onSurfaceVariant
				: theme.light.onSurfaceVariant,
			outline: isDark ? theme.dark.outline : theme.light.outline,
			error: isDark ? theme.dark.error : theme.light.error,

			// Custom app colors
			like: AppColors.like,
			reject: AppColors.reject,
			match: AppColors.match,
			accent: AppColors.accent,
		},
	};
}

// Theme context type for consistency
export type AppTheme = ReturnType<typeof useAppTheme>;
