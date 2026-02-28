import { useClerk } from "@clerk/clerk-expo";
import { Pressable, Text } from "react-native";

export const SignOutButton = () => {
	const { signOut } = useClerk();

	const handleSignOut = async () => {
		try {
			await signOut();
			// Navigation is handled automatically by Stack.Protected guards
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<Pressable
			style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
			onPress={handleSignOut}
		>
			<Text>Sign out</Text>
		</Pressable>
	);
};
