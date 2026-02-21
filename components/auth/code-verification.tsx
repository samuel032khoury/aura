import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { AnimatedInput } from "@/components/animated-input";
import { GradientButton } from "@/components/gradient-button";
import styles from "@/lib/styles/auth";
import type { AuthTheme } from "@/lib/theme";

interface CodeVerificationProps {
	theme: AuthTheme;
	code: string;
	setCode: (code: string) => void;
	error: string;
	loading: boolean;
	onVerify: () => void;
}

export function CodeVerification({
	theme: t,
	code,
	setCode,
	error,
	loading,
	onVerify,
}: CodeVerificationProps) {
	return (
		<>
			{/* Verify header */}
			<Animated.View
				entering={FadeInDown.delay(100).duration(700).springify()}
				style={{ alignItems: "center", gap: 12, marginBottom: 32 }}
			>
				<View style={styles.logoContainer}>
					<LinearGradient
						colors={["#FF6B6B", "#FF8E8E"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.logoGradient}
					>
						<SymbolView name="envelope.fill" size={38} tintColor="#FFFFFF" />
					</LinearGradient>
				</View>
				<Text style={[styles.logoText, { color: t.textPrimary }]}>
					Verify your email
				</Text>
				<Text style={[styles.logoTagline, { color: t.textSecondary }]}>
					A verification code has been sent to your email
				</Text>
			</Animated.View>

			{/* Code input */}
			<Animated.View
				entering={FadeInDown.delay(300).duration(700).springify()}
				style={styles.inputSection}
			>
				<AnimatedInput
					icon="number"
					theme={t}
					placeholder="Enter verification code"
					value={code}
					onChangeText={setCode}
					keyboardType="numeric"
				/>
				{error ? (
					<Animated.View
						entering={FadeInDown.duration(300)}
						style={[styles.errorContainer, { backgroundColor: t.errorBg }]}
					>
						<SymbolView
							name="exclamationmark.triangle.fill"
							size={16}
							tintColor={t.errorText}
						/>
						<Text selectable style={[styles.errorText, { color: t.errorText }]}>
							{error}
						</Text>
					</Animated.View>
				) : null}
			</Animated.View>

			{/* Verify button */}
			<Animated.View
				entering={FadeInUp.delay(400).duration(700).springify()}
				style={[styles.bottomSection, { marginTop: 40 }]}
			>
				<GradientButton
					onPress={onVerify}
					disabled={loading || !code}
					loading={loading}
					icon="checkmark"
				>
					Verify
				</GradientButton>
			</Animated.View>
		</>
	);
}
