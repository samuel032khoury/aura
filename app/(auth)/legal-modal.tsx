import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { hapticButtonPress } from "@/lib/haptics";
import { type LegalDocumentType, legalDocuments } from "@/lib/legal";
import { useTheme } from "@/hooks/use-theme";

export default function LegalModal() {
	const { type } = useLocalSearchParams<{ type: LegalDocumentType }>();
	const router = useRouter();
	const { colors } = useTheme();

	const doc = legalDocuments[type ?? "tos"];

	const dismiss = () => {
		hapticButtonPress();
		if (router.canGoBack()) {
			router.back();
		}
	};

	return (
		<>
			{/* ScrollView must be the first child per Expo Router conventions */}
			<ScrollView
				style={[styles.container, { backgroundColor: colors.surface }]}
				contentContainerStyle={styles.scrollContent}
				contentInsetAdjustmentBehavior="automatic"
				showsVerticalScrollIndicator={false}
			>
				{/* Title */}
				<Text style={[styles.title, { color: colors.textPrimary }]}>
					{doc.title}
				</Text>

				{/* Last Updated */}
				<Text style={[styles.lastUpdated, { color: colors.textTertiary }]}>
					Last updated {doc.lastUpdated}
				</Text>

				{/* Divider */}
				<View style={[styles.divider, { backgroundColor: colors.textTertiary }]} />

				{/* Sections */}
				{doc.sections.map((section) => (
					<View key={section.heading} style={styles.section}>
						<Text
							selectable
							style={[styles.sectionHeading, { color: colors.textPrimary }]}
						>
							{section.heading}
						</Text>
						<Text
							selectable
							style={[styles.sectionBody, { color: colors.textSecondary }]}
						>
							{section.body}
						</Text>
					</View>
				))}
			</ScrollView>

			<Stack.Toolbar placement="right">
				<Stack.Toolbar.Button icon="xmark" onPress={dismiss} />
			</Stack.Toolbar>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 24,
		paddingTop: 20,
	},
	title: {
		fontSize: 26,
		fontWeight: "800",
		letterSpacing: -0.5,
		marginBottom: 6,
	},
	lastUpdated: {
		fontSize: 13,
		fontWeight: "500",
		marginBottom: 16,
	},
	divider: {
		height: StyleSheet.hairlineWidth,
		opacity: 0.2,
		marginBottom: 24,
	},
	section: {
		marginBottom: 24,
		gap: 6,
	},
	sectionHeading: {
		fontSize: 16,
		fontWeight: "700",
	},
	sectionBody: {
		fontSize: 15,
		lineHeight: 22,
	},
});
