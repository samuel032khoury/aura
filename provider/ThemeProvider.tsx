import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import type { AppTheme } from "@/lib/theme";
import {
	AppColors,
	DarkColors,
	LightColors,
	SEED_COLOR,
	ThemeContext,
} from "@/lib/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const colorScheme = useColorScheme();
	const { theme } = useMaterial3Theme({ sourceColor: SEED_COLOR });

	const isDark = colorScheme === "dark";

	const value = useMemo<AppTheme>(() => {
		const m3 = isDark ? theme.dark : theme.light;
		const palette = isDark ? DarkColors : LightColors;

		return {
			isDark,
			colors: {
				// Material 3
				primary: m3.primary,
				onPrimary: m3.onPrimary,
				primaryContainer: m3.primaryContainer,
				onPrimaryContainer: m3.onPrimaryContainer,
				secondary: m3.secondary,
				onSecondary: m3.onSecondary,
				background: m3.background,
				onBackground: m3.onBackground,
				onSurface: m3.onSurface,
				surfaceVariant: m3.surfaceVariant,
				onSurfaceVariant: m3.onSurfaceVariant,
				outline: m3.outline,
				error: m3.error,

				// Custom app
				like: AppColors.like,
				reject: AppColors.reject,
				match: AppColors.match,
				accent: AppColors.accent,

				// Visual / input (mode-aware)
				...palette,
			},
		};
	}, [isDark, theme]);

	const navigationTheme = useMemo(
		() => ({
			...(isDark ? DarkTheme : DefaultTheme),
			colors: {
				...(isDark ? DarkTheme.colors : DefaultTheme.colors),
				background: value.colors.background,
			},
		}),
		[isDark, value.colors.background],
	);

	return (
		<ThemeContext.Provider value={value}>
			<NavigationThemeProvider value={navigationTheme}>
				{children}
			</NavigationThemeProvider>
		</ThemeContext.Provider>
	);
}
