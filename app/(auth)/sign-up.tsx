import { useSignUp } from "@clerk/clerk-expo";
import type { EmailCodeFactor } from "@clerk/types";
import * as Haptics from "expo-haptics";
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
import { AuthBackground } from "@/components/auth/auth-background";
import { GradientButton } from "@/components/auth/gradient-button";
import { getClerkErrorMessage } from "@/lib/clerk-error";
import styles from "@/lib/styles/auth";
import { useAuthTheme } from "@/lib/theme";

export default function Page() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const t = useAuthTheme();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const isValidSignIn = useMemo(
		() => emailAddress.length > 0 && password.length > 0,
		[emailAddress, password],
	);

	const onSignUpPress = useCallback(async () => {
		if (!isLoaded) return;

		setLoading(true);
		setError("");
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
			setPendingVerification(true);
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [isLoaded, signUp, emailAddress, password]);

	const onVerifyPress = useCallback(async () => {
		if (!isLoaded) return;
		
		setLoading(true);
		setError("");
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (signUpAttempt.status === "complete") {
				await setActive({
					session: signUpAttempt.createdSessionId,
					navigate: async ({ session }) => {
						if (session?.currentTask) {
							console.log(session?.currentTask);
							return;
						}
						router.replace("/");
					},
				});
			} else {
				console.error(JSON.stringify(signUpAttempt, null, 2));
				setError("Verification failed. Please try again.");
			}
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [isLoaded, signUp, setActive, router, code]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[styles.container, { backgroundColor: t.surface }]}>
				<AuthBackground showHearts={!pendingVerification} />

				<View
					style={{
						flexGrow: 1,
						paddingTop: insets.top + 60,
						paddingBottom: insets.bottom + 24,
						paddingHorizontal: 24,
					}}
				>
					{pendingVerification ? (
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

							{/* Verify button */}
							<Animated.View
								entering={FadeInUp.delay(400).duration(700).springify()}
								style={[styles.bottomSection, { marginTop: 40 }]}
							>
								<GradientButton
									onPress={onVerifyPress}
									disabled={loading || !code}
									loading={loading}
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
											name="sparkles"
											size={42}
											tintColor="#FFFFFF"
										/>
									</LinearGradient>
								</View>
								<Text style={[styles.logoText, { color: t.textPrimary }]}>
									Join Aura
								</Text>
								<Text style={[styles.logoTagline, { color: t.textSecondary }]}>
									Create an account to start matching
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
									autoComplete="password-new"
								/>

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
									onPress={onSignUpPress}
									disabled={loading || !isValidSignIn}
									loading={loading}
									loadingText="Creating account..."
									icon="arrow.right"
								>
									Continue
								</GradientButton>

								<View style={styles.signUpContainer}>
									<Text style={[styles.signUpText, { color: t.textTertiary }]}>
										Already have an account?{" "}
									</Text>
									<Link href="/(auth)/sign-in" asChild>
										<TouchableOpacity
											onPress={() =>
												Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
											}
										>
											<Text
												style={[styles.signUpLink, { color: t.accentLink }]}
											>
												Sign In
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
