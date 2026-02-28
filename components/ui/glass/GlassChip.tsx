import { Pressable, StyleSheet, Text } from "react-native";
import { LiquidGlassAdapter } from "@/components/ui/adapter/liquid-glass-adapter";
import { hapticSelection } from "@/lib/haptics";
import { useTheme } from "@/lib/theme";

interface GlassChipProps {
	emoji: string;
	label: string;
	selected: boolean;
	onPress: () => void;
}

export function GlassChip({ emoji, label, selected, onPress }: GlassChipProps) {
	const { colors } = useTheme();

	const handlePress = () => {
		hapticSelection();
		onPress();
	};

	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
		>
			<LiquidGlassAdapter
				style={styles.chip}
				isInteractive
				tintColor={selected ? colors.primary : undefined}
				fallbackColor={selected ? colors.primary : colors.surfaceVariant}
				fallbackStyle={[
					styles.fallback,
					{ borderColor: selected ? colors.primary : colors.outline },
				]}
			>
				<Text style={styles.emoji}>{emoji}</Text>
				<Text
					style={[
						styles.label,
						{ color: selected ? "#FFFFFF" : colors.onSurfaceVariant },
					]}
				>
					{label}
				</Text>
			</LiquidGlassAdapter>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	chip: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 24,
		gap: 8,
	},
	fallback: {
		borderWidth: 2,
	},
	emoji: {
		fontSize: 18,
	},
	label: {
		fontSize: 15,
		fontWeight: "600",
	},
});
