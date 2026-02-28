import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { LiquidGlassAdapter } from "@/components/ui/adapter/liquid-glass-adapter";
import { useTheme } from "@/hooks/use-theme";

type GlassTextAreaProps = Omit<TextInputProps, "style">;

export function GlassTextArea(props: GlassTextAreaProps) {
	const { colors } = useTheme();

	return (
		<LiquidGlassAdapter style={styles.container} isInteractive>
			<TextInput
				style={[styles.input, { color: colors.onSurface }]}
				placeholderTextColor={colors.onSurfaceVariant}
				multiline
				textAlignVertical="top"
				{...props}
			/>
		</LiquidGlassAdapter>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxHeight: 200,
		borderRadius: 20,
	},
	input: {
		flex: 1,
		padding: 20,
		fontSize: 17,
		lineHeight: 26,
	},
});
