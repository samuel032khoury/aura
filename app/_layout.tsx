import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useAuth } from "@clerk/clerk-expo";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useAppTheme } from "@/lib/theme";
import AppProviders from "@/provider";

function RootLayoutNav() {
	const { isSignedIn } = useAuth();
	const { isDark, colors } = useAppTheme();

	const navTheme = {
		...(isDark ? DarkTheme : DefaultTheme),
		colors: {
			...(isDark ? DarkTheme.colors : DefaultTheme.colors),
			background: colors.background,
		},
	};

	return (
		<ThemeProvider value={navTheme}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Protected guard={!isSignedIn}>
					<Stack.Screen name="(auth)" />
				</Stack.Protected>
				<Stack.Protected guard={!!isSignedIn}>
					<Stack.Screen name="(app)" />
				</Stack.Protected>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}

export default function RootLayout() {
	return (
		<AppProviders>
			<RootLayoutNav />
		</AppProviders>
	);
}
