import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useAuth } from "@clerk/clerk-expo";
import AppProviders from "@/provider";

function RootLayoutNav() {
	const { isSignedIn } = useAuth();

	return (
		<>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Protected guard={!isSignedIn}>
					<Stack.Screen name="(auth)" />
				</Stack.Protected>
				<Stack.Protected guard={!!isSignedIn}>
					<Stack.Screen name="(app)" />
				</Stack.Protected>
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}

export default function RootLayout() {
	return (
		<AppProviders>
			<RootLayoutNav />
		</AppProviders>
	);
}
