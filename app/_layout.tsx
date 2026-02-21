import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AppProviders from "@/provider";
import { useAuth } from "@clerk/clerk-expo";

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
