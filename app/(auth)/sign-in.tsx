import { useSignIn } from "@clerk/clerk-expo";
import type { EmailCodeFactor } from "@clerk/types";
import * as Haptics from "expo-haptics";
import { AuthBackground } from "@/components/auth/auth-background";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useMemo, useState } from "react";
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedInput } from "@/components/auth/animated-input";
import { GradientButton } from "@/components/auth/gradient-button";

import { getClerkErrorMessage } from "@/lib/clerk-error";
import styles from "@/lib/styles/auth";
import { useAuthTheme } from "@/lib/theme";

export default function Page() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const t = useAuthTheme();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [showEmailCode, setShowEmailCode] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const isValid = useMemo(
		() => emailAddress.length > 0 && password.length > 0,
		[emailAddress, password],
	);

	const handleSignIn = useCallback(async () => {
		if (!isLoaded) return;

		setLoading(true);
		setError("");
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			if (signInAttempt.status === "complete") {
				await setActive({
					session: signInAttempt.createdSessionId,
					navigate: async ({ session }) => {
						if (session?.currentTask) {
							console.log(session?.currentTask);
							return;
						}
						router.replace("/");
					},
				});
			} else if (signInAttempt.status === "needs_second_factor") {
				const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
					(factor): factor is EmailCodeFactor =>
						factor.strategy === "email_code",
				);

				if (emailCodeFactor) {
					await signIn.prepareSecondFactor({
						strategy: "email_code",
						emailAddressId: emailCodeFactor.emailAddressId,
					});
					setShowEmailCode(true);
				}
			} else {
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [isLoaded, signIn, setActive, router, emailAddress, password]);

	const handleVerify = useCallback(async () => {
		if (!isLoaded) return;

		try {
			const signInAttempt = await signIn.attemptSecondFactor({
				strategy: "email_code",
				code,
			});

			if (signInAttempt.status === "complete") {
				await setActive({
					session: signInAttempt.createdSessionId,
					navigate: async ({ session }) => {
						if (session?.currentTask) {
							console.log(session?.currentTask);
							return;
						}
						router.replace("/");
					},
				});
			} else {
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		}
	}, [isLoaded, signIn, setActive, router, code]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[styles.container, { backgroundColor: t.surface }]}>
				<AuthBackground showHearts={!showEmailCode} />

				<View
					style={{
						flexGrow: 1,
						paddingTop: insets.top + 60,
						paddingBottom: insets.bottom + 24,
						paddingHorizontal: 24,
					}}
				>
					{showEmailCode ? (
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
										<SymbolView
											name="envelope.fill"
											size={38}
											tintColor="#FFFFFF"
										/>
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
							</Animated.View>

							{/* Verify button */}
							<Animated.View
								entering={FadeInUp.delay(400).duration(700).springify()}
								style={[styles.bottomSection, { marginTop: 40 }]}
							>
								<GradientButton
									onPress={handleVerify}
									disabled={!code}
									icon="checkmark"
								>
									Verify
								</GradientButton>
							</Animated.View>
						</>
					) : (
						<>
							{/* Logo */}
							<Animated.View
								entering={FadeInDown.delay(100).duration(700).springify()}
								style={styles.logoSection}
							>
								<View style={styles.logoContainer}>
									<LinearGradient
										colors={["#FF6B6B", "#FF8E8E"]}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 1 }}
										style={styles.logoGradient}
									>
										<SymbolView
											name="heart.fill"
											size={42}
											tintColor="#FFFFFF"
										/>
									</LinearGradient>
								</View>
								<Text style={[styles.logoText, { color: t.textPrimary }]}>
									Aura
								</Text>
								<Text style={[styles.logoTagline, { color: t.textSecondary }]}>
									Find your perfect match
								</Text>
							</Animated.View>

							{/* Inputs */}
							<Animated.View
								entering={FadeInDown.delay(300).duration(700).springify()}
								style={styles.inputSection}
							>
								<AnimatedInput
									icon="envelope.fill"
									theme={t}
									placeholder="Email address"
									value={emailAddress}
									onChangeText={setEmailAddress}
									autoCapitalize="none"
									keyboardType="email-address"
									autoComplete="email"
								/>
								<AnimatedInput
									icon="lock.fill"
									theme={t}
									placeholder="Password"
									value={password}
									onChangeText={setPassword}
									secureTextEntry
									autoComplete="password"
								/>

								<TouchableOpacity style={styles.forgotPassword}>
									<Text
										style={[styles.forgotPasswordText, { color: t.accentLink }]}
									>
										Forgot password?
									</Text>
								</TouchableOpacity>

								{error ? (
									<Animated.View
										entering={FadeInDown.duration(300)}
										style={[
											styles.errorContainer,
											{ backgroundColor: t.errorBg },
										]}
									>
										<SymbolView
											name="exclamationmark.triangle.fill"
											size={16}
											tintColor={t.errorText}
										/>
										<Text
											selectable
											style={[styles.errorText, { color: t.errorText }]}
										>
											{error}
										</Text>
									</Animated.View>
								) : null}
							</Animated.View>

							{/* Bottom */}
							<Animated.View
								entering={FadeIn.delay(500).duration(700).springify()}
								style={[styles.bottomSection, { marginTop: "auto" }]}
							>
								<GradientButton
									onPress={handleSignIn}
									disabled={loading || !isValid}
									loading={loading}
									loadingText="Signing in..."
									icon="arrow.right"
								>
									Sign In
								</GradientButton>

								<View style={styles.signUpContainer}>
									<Text style={[styles.signUpText, { color: t.textTertiary }]}>
										Don&apos;t have an account?{" "}
									</Text>
									<Link href="/(auth)/sign-up" asChild>
										<TouchableOpacity
											onPress={() =>
												Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
											}
										>
											<Text
												style={[styles.signUpLink, { color: t.accentLink }]}
											>
												Sign Up
											</Text>
										</TouchableOpacity>
									</Link>
								</View>
							</Animated.View>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
