import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { AnimatedInput } from "@/components/animated-input";
import { GradientButton } from "@/components/gradient-button";
import styles from "@/lib/styles/auth";
import { type ThemeColors, Gradients } from "@/lib/theme";

const COOLDOWN_SECONDS = 60;

interface CodeVerificationProps {
	colors: ThemeColors;
	code: string;
	setCode: (code: string) => void;
	error: string;
	loading: boolean;
	onVerify: () => void;
	email?: string;
	onResend?: () => void;
	resending?: boolean;
	resent?: boolean;
}

export function CodeVerification({
	colors,
	code,
	setCode,
	error,
	loading,
	onVerify,
	email,
	onResend,
	resending,
	resent,
}: CodeVerificationProps) {
	const [cooldown, setCooldown] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startCooldown = useCallback(() => {
		setCooldown(COOLDOWN_SECONDS);
		intervalRef.current = setInterval(() => {
			setCooldown((prev) => {
				if (prev <= 1) {
					if (intervalRef.current) clearInterval(intervalRef.current);
					intervalRef.current = null;
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	}, []);

	// Start cooldown once the resend request completes successfully
	const wasResending = useRef(false);
	useEffect(() => {
		if (resending) {
			wasResending.current = true;
		} else if (wasResending.current) {
			wasResending.current = false;
			if (resent) {
				startCooldown();
			}
		}
	}, [resending, resent, startCooldown]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	const handleResendWithCooldown = useCallback(() => {
		if (cooldown > 0 || resending || !onResend) return;
		onResend();
	}, [cooldown, resending, onResend]);

	const canResend = cooldown === 0 && !resending;

	return (
		<>
			{/* Verify header */}
			<Animated.View
				entering={FadeInDown.delay(100).duration(700).springify()}
				style={styles.sectionHeader}
			>
				<View style={styles.logoContainer}>
					<LinearGradient
						colors={Gradients.logo}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.logoGradient}
					>
						<SymbolView name="envelope.fill" size={38} tintColor="#FFFFFF" />
					</LinearGradient>
				</View>
				<Text style={[styles.logoText, { color: colors.textPrimary }]}>
					Verify your email
				</Text>
				<Text
					style={[
						styles.logoTagline,
						{ color: colors.textSecondary, textAlign: "center" },
					]}
				>
					We sent a verification code to{" "}
					{email ? (
						<Text
							selectable
							style={{ color: colors.textPrimary, fontWeight: "700" }}
						>
							{email}
						</Text>
					) : (
						"your email"
					)}
				</Text>
			</Animated.View>

			{/* Code input */}
			<Animated.View
				entering={FadeInDown.delay(300).duration(700).springify()}
				style={styles.inputSection}
			>
				<AnimatedInput
					icon="number"
					colors={colors}
					placeholder="Enter verification code"
					value={code}
					onChangeText={setCode}
					keyboardType="numeric"
				/>
				{error ? (
					<Animated.View
						entering={FadeInDown.duration(300)}
						style={[styles.errorContainer, { backgroundColor: colors.errorBg }]}
					>
						<SymbolView
							name="exclamationmark.triangle.fill"
							size={16}
							tintColor={colors.errorText}
						/>
						<Text selectable style={[styles.errorText, { color: colors.errorText }]}>
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

				{onResend ? (
					<View style={styles.signUpContainer}>
						{resending ? (
							<Text style={[styles.signUpText, { color: colors.textSecondary }]}>
								Sending a new code…
							</Text>
						) : cooldown > 0 ? (
							<Text style={[styles.signUpText, { color: colors.textSecondary }]}>
								Get a new code in{" "}
								<Text
									style={{
										fontWeight: "700",
										color: colors.textSecondary,
										fontVariant: ["tabular-nums"],
									}}
								>
									{cooldown}s
								</Text>
							</Text>
						) : (
							<>
								<Text style={[styles.signUpText, { color: colors.textSecondary }]}>
									{resent ? "Code sent! " : "Didn't receive a code? "}
								</Text>
								<TouchableOpacity
									onPress={handleResendWithCooldown}
									disabled={!canResend}
								>
									<Text
										style={[
											styles.signUpLink,
											{
												color: canResend ? colors.accentLink : colors.textSecondary,
											},
										]}
									>
										{resending ? "Sending…" : "Get a new code"}
									</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				) : null}
			</Animated.View>
		</>
	);
}
