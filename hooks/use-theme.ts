import { useContext } from "react";
import type { AppTheme } from "@/lib/theme";
import { ThemeContext } from "@/lib/theme";

export function useTheme(): AppTheme {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within <ThemeProvider>");
	}
	return ctx;
}
