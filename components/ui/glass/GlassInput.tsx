import { TextInput, type TextInputProps } from "react-native";

import { LiquidGlassAdapter } from "@/components/ui/adapter/liquid-glass-adapter";
import { useTheme } from "@/lib/theme";

type GlassInputProps = Omit<TextInputProps, "style">;

const containerStyle = {
	height: 54,
	borderRadius: 14,
	borderCurve: "continuous" as const,
	justifyContent: "center" as const,
	overflow: "hidden" as const,
};

export function GlassInput(props: GlassInputProps) {
	const { isDark } = useTheme();

	const textColor = isDark ? "#FFFFFF" : "#1A1A1A";
	const placeholderColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";

	return (
		<LiquidGlassAdapter style={containerStyle} isInteractive>
			<TextInput
				style={{
					flex: 1,
					paddingHorizontal: 18,
					fontSize: 17,
					color: textColor,
				}}
				placeholderTextColor={placeholderColor}
				{...props}
			/>
		</LiquidGlassAdapter>
	);
}
