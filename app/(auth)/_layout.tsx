import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen name="sign-in" />
			<Stack.Screen name="sign-up" />
			<Stack.Screen name="verify-code" />
			<Stack.Screen name="forgot-password" />
			<Stack.Screen
				name="legal-modal"
				options={{
					presentation: "formSheet",
					headerShown: true,
					title: "",
					headerTransparent: true,
					sheetGrabberVisible: true,
				}}
			/>
		</Stack>
	);
}
