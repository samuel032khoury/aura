import { useSignIn } from "@clerk/clerk-expo";
import type { EmailCodeFactor } from "@clerk/types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useMemo, useState } from "react";
import {
	Keyboard,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedInput } from "@/components/animated-input";
import { AuthBackground } from "@/components/auth/auth-background";
import { GradientButton } from "@/components/gradient-button";
import { getClerkErrorMessage } from "@/lib/clerk-error";
import { hapticButtonPress, hapticNavigation } from "@/lib/haptics";
import styles from "@/lib/styles/auth";
import { Gradients, useTheme } from "@/lib/theme";

export default function Page() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
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
		hapticButtonPress();

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
					router.push(
						`/(auth)/verify-code?type=sign-in&email=${encodeURIComponent(emailAddress)}`,
					);
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

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[styles.container, { backgroundColor: colors.surface }]}>
				<AuthBackground />

				<View
					style={[
						styles.contentWrapper,
						{ paddingTop: insets.top + 60, paddingBottom: insets.bottom + 24 },
					]}
				>
					{/* Logo */}
					<Animated.View
						entering={FadeInDown.delay(100).duration(700).springify()}
						style={styles.logoSection}
					>
						<View style={styles.logoContainer}>
							<LinearGradient
								colors={Gradients.logo}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								style={styles.logoGradient}
							>
								<SymbolView name="heart.fill" size={42} tintColor="#FFFFFF" />
							</LinearGradient>
						</View>
						<Text style={[styles.logoText, { color: colors.textPrimary }]}>
							Aura
						</Text>
						<Text style={[styles.logoTagline, { color: colors.textSecondary }]}>
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
							colors={colors}
							placeholder="Email address"
							value={emailAddress}
							onChangeText={setEmailAddress}
							autoCapitalize="none"
							keyboardType="email-address"
							autoComplete="email"
						/>
						<AnimatedInput
							icon="lock.fill"
							colors={colors}
							placeholder="Password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							autoComplete="password"
						/>

						<TouchableOpacity
							style={styles.forgotPassword}
							onPress={() => {
								hapticNavigation();
								router.push("/(auth)/forgot-password");
							}}
						>
							<Text
								style={[styles.forgotPasswordText, { color: colors.accentLink }]}
							>
								Forgot password?
							</Text>
						</TouchableOpacity>

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
								<Text
									selectable
									style={[styles.errorText, { color: colors.errorText }]}
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
							<Text style={[styles.signUpText, { color: colors.textTertiary }]}>
								Don&apos;t have an account?
							</Text>
							<TouchableOpacity
								onPress={() => {
									hapticNavigation();
									router.push("/(auth)/sign-up");
								}}
							>
								<Text style={[styles.signUpLink, { color: colors.accentLink }]}>
									Sign Up
								</Text>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
