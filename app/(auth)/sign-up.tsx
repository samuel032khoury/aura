import { useSignUp } from "@clerk/clerk-expo";
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
import { Gradients, useAuthTheme } from "@/lib/theme";

export default function Page() {
	const { isLoaded, signUp } = useSignUp();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const t = useAuthTheme();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const isValidSignIn = useMemo(
		() => emailAddress.length > 0 && password.length > 0,
		[emailAddress, password],
	);

	const handleSignUp = useCallback(async () => {
		if (!isLoaded) return;

		setLoading(true);
		setError("");
		hapticButtonPress();

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
			router.push(
				`/(auth)/verify-code?type=sign-up&email=${encodeURIComponent(emailAddress)}`,
			);
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [isLoaded, signUp, emailAddress, password, router]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[styles.container, { backgroundColor: t.surface }]}>
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
						{/* Terms of service */}
						<View style={{ flexDirection: "row" }}>
							<Text style={[styles.termsText, { color: t.textTertiary }]}>
								By signing up, you agree to our
							</Text>
							<TouchableOpacity
								onPress={() => {
									hapticNavigation();
									router.push("/(auth)/legal-modal?type=tos");
								}}
							>
								<Text style={[styles.termsLink, { color: t.accentLink }]}>
									Terms of Service
								</Text>
							</TouchableOpacity>
							<Text style={[styles.termsText, { color: t.textTertiary }]}>
								and
							</Text>
							<TouchableOpacity
								onPress={() => {
									hapticNavigation();
									router.push("/(auth)/legal-modal?type=privacy");
								}}
							>
								<Text style={[styles.termsLink, { color: t.accentLink }]}>
									Privacy Policy
								</Text>
							</TouchableOpacity>
							<Text style={{ fontSize: 12, color: t.textTertiary }}>.</Text>
						</View>

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
							onPress={handleSignUp}
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
							<TouchableOpacity
								onPress={() => {
									hapticNavigation();
									if (router.canGoBack()) {
										router.back();
									} else {
										router.replace("/(auth)/sign-in");
									}
								}}
							>
								<Text style={[styles.signUpLink, { color: t.accentLink }]}>
									Sign In
								</Text>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
