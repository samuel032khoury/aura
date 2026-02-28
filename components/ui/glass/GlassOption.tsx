import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { LiquidGlassAdapter } from "@/components/ui/adapter/liquid-glass-adapter";
import { hapticSelection } from "@/lib/haptics";
import { glassFallbackStyles } from "@/lib/styles/glass";
import { useTheme } from "@/hooks/use-theme";
import { AppColors } from "@/lib/theme";

interface GlassOptionProps {
	icon: string;
	label: string;
	onPress: () => void;
	selected?: boolean;
}

export function GlassOption({
	icon,
	label,
	onPress,
	selected = false,
}: GlassOptionProps) {
	const { colors } = useTheme();

	const handlePress = () => {
		hapticSelection();
		onPress();
	};

	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
		>
			<LiquidGlassAdapter
				style={[
					styles.option,
					selected && {
						borderColor: AppColors.primary,
						borderWidth: 2.5,
					},
				]}
				isInteractive
				fallbackColor={
					selected ? `${AppColors.primary}15` : colors.surfaceVariant
				}
				fallbackStyle={[
					glassFallbackStyles.card,
					{
						borderColor: selected ? AppColors.primary : colors.outline,
						borderWidth: selected ? 2.5 : 1.5,
					},
				]}
			>
				<Text style={styles.icon}>{icon}</Text>
				<Text style={[styles.label, { color: colors.onBackground }]}>
					{label}
				</Text>
				{selected && (
					<View
						style={[styles.checkmark, { backgroundColor: AppColors.primary }]}
					>
						<Ionicons name="checkmark" size={16} color="#FFFFFF" />
					</View>
				)}
			</LiquidGlassAdapter>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	option: {
		flexDirection: "row",
		alignItems: "center",
		padding: 24,
		borderRadius: 20,
		gap: 16,
	},
	icon: {
		fontSize: 36,
	},
	label: {
		flex: 1,
		fontSize: 20,
		fontWeight: "600",
	},
	checkmark: {
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
	},
});
