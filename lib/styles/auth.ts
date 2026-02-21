import { StyleSheet } from "react-native";
import { shadowPrimary } from "@/lib/theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logoSection: {
		alignItems: "center",
		gap: 12,
		marginBottom: 40,
	},
	logoContainer: {
		...shadowPrimary,
	},
	logoGradient: {
		width: 88,
		height: 88,
		borderRadius: 28,
		borderCurve: "continuous",
		justifyContent: "center",
		alignItems: "center",
	},
	logoText: {
		fontSize: 32,
		fontWeight: "800",
		letterSpacing: -0.5,
	},
	logoTagline: {
		fontSize: 15,
		fontWeight: "500",
	},
	inputSection: {
		gap: 16,
	},
	forgotPassword: {
		alignSelf: "flex-end",
	},
	forgotPasswordText: {
		fontSize: 14,
		fontWeight: "600",
	},
	errorContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		padding: 14,
		borderRadius: 12,
	},
	errorText: {
		flex: 1,
		fontSize: 14,
		lineHeight: 20,
	},
	bottomSection: {
		gap: 24,
	},
	signUpContainer: {
		flexDirection: "row",
		justifyContent: "center",
		paddingBottom: 8,
	},
	signUpText: {
		fontSize: 15,
	},
	signUpLink: {
		fontSize: 15,
		fontWeight: "700",
	},
});

export default styles;
