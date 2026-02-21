import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FloatingHeart } from "@/components/floating-heart";
import { useAuthTheme } from "@/lib/theme";

interface AuthBackgroundProps {
	showHearts?: boolean;
}

export function AuthBackground({ showHearts = true }: AuthBackgroundProps) {
	const t = useAuthTheme();

	return (
		<>
			<LinearGradient
				colors={[...t.gradient]}
				locations={[0, 0.3, 0.6, 1]}
				style={StyleSheet.absoluteFill}
			/>

			{showHearts && (
				<>
					<FloatingHeart
						size={24}
						top={80}
						left={40}
						delay={0}
						opacity={t.heartOpacity[0]}
					/>
					<FloatingHeart
						size={18}
						top={140}
						left={320}
						delay={200}
						opacity={t.heartOpacity[1]}
					/>
					<FloatingHeart
						size={32}
						top={560}
						left={20}
						delay={400}
						opacity={t.heartOpacity[2]}
					/>
					<FloatingHeart
						size={20}
						top={600}
						left={340}
						delay={600}
						opacity={t.heartOpacity[3]}
					/>
				</>
			)}
		</>
	);
}
