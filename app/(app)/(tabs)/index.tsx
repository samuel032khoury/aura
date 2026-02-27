import { SignedIn, useUser } from "@clerk/clerk-expo";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/sign-out-button";
import { AppColors } from "@/lib/theme";

export default function Page() {
	const { user } = useUser();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Developer Dashboard</Text>

			<SignedIn>
				<View style={styles.centeredCard}>
					<Text style={styles.body}>Welcome, {user?.firstName || "User"}!</Text>
					<TouchableOpacity
						style={styles.signOutButton}
						onPress={() => console.log("Sign Out")}
					>
						<SignOutButton />
					</TouchableOpacity>
				</View>
			</SignedIn>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	body: {
		fontSize: 16,
		textAlign: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		marginBottom: 16,
		textAlign: "center",
	},
	card: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		marginBottom: 16,
	},
	centeredCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		alignItems: "center",
	},
	signOutButton: {
		marginTop: 16,
		backgroundColor: AppColors.primary,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	signOutButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
