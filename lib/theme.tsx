import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";

// ─── Static constants ────────────────────────────────────────────────────────

/** App seed color — a warm, romantic pink/coral */
export const SEED_COLOR = "#FF6B6B";
/** Gradient tuple — at least two color stops, directly usable by LinearGradient */
export type GradientTuple = readonly [string, string, ...string[]];


export const Gradients = {
	/** Primary button gradient */
	button: [SEED_COLOR, "#FF5252"] as GradientTuple,
	/** Logo / accent gradient */
	logo: [SEED_COLOR, "#FF8E8E"] as GradientTuple,
};

/** Static app brand colors (not mode-aware — use for direct references only) */
export const AppColors = {
	primary: SEED_COLOR,
	secondary: "#4ECDC4",
	accent: "#FFE66D",
	like: "#4CD964",
	reject: "#FF3B30",
	match: "#FF2D55",
};

// ─── Light / dark palettes ───────────────────────────────────────────────────

const LightColors = {
	// Material 3 tokens (resolved at runtime below)
	// --- filled in by the provider ---

	// Visual / input tokens
	gradient: ["#FFF5F5", "#FFE8E8", "#FFF0F0", "#FFFFFF"] as const,
	surface: "#FFFFFF",
	inputBg: "#F8F8F8",
	inputBgFocused: "#FFFFFF",
	textPrimary: "#1A1A1A",
	textSecondary: "#888888",
	textTertiary: "#666666",
	placeholder: "#AAAAAA",
	iconDefault: "#999999",
	accentLink: SEED_COLOR,
	errorBg: "rgba(220, 38, 38, 0.08)",
	errorText: "#DC2626",
	heartOpacity: [0.15, 0.12, 0.1, 0.08] as const,
} as const;

const DarkColors = {
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
} as const;

// ─── Exported types ──────────────────────────────────────────────────────────

export interface ThemeColors {
	// Material 3
	primary: string;
	onPrimary: string;
	primaryContainer: string;
	onPrimaryContainer: string;
	secondary: string;
	onSecondary: string;
	background: string;
	onBackground: string;
	surface: string;
	onSurface: string;
	surfaceVariant: string;
	onSurfaceVariant: string;
	outline: string;
	error: string;

	// Custom app
	like: string;
	reject: string;
	match: string;
	accent: string;

	// Visual / input / auth
	gradient: GradientTuple;
	inputBg: string;
	inputBgFocused: string;
	textPrimary: string;
	textSecondary: string;
	textTertiary: string;
	placeholder: string;
	iconDefault: string;
	accentLink: string;
	errorBg: string;
	errorText: string;
	heartOpacity: readonly [number, number, number, number];
}

export interface AppTheme {
	isDark: boolean;
	colors: ThemeColors;
}

// ─── Context + Provider ──────────────────────────────────────────────────────

const ThemeContext = createContext<AppTheme | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
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

				// Visual / input (auth-palette-origin, mode-aware)
				...palette,
			},
		};
	}, [isDark, theme]);

	return <ThemeContext value={value}>{children}</ThemeContext>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTheme(): AppTheme {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within <AppThemeProvider>");
	}
	return ctx;
}
