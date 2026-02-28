/** App seed color — a warm, romantic pink/coral */
export const SEED_COLOR = "#FF6B6B";

/** Gradient tuple — at least two color stops, directly usable by LinearGradient */
export type GradientTuple = readonly [string, string, ...string[]];

export const Gradients = {
	button: [SEED_COLOR, "#FF5252"] as GradientTuple,
	logo: [SEED_COLOR, "#FF8E8E"] as GradientTuple,
};

export const AppColors = {
	primary: SEED_COLOR,
	secondary: "#4ECDC4",
	accent: "#FFE66D",
	like: "#4CD964",
	reject: "#FF3B30",
	match: "#FF2D55",
};

export const LightColors = {
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

export const DarkColors = {
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

export interface ThemeColors {
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

	like: string;
	reject: string;
	match: string;
	accent: string;

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

import { createContext } from "react";

export const ThemeContext = createContext<AppTheme | null>(null);
