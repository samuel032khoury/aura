import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useMemo, useState } from "react";
import {
	Keyboard,
	Pressable,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedInput } from "@/components/animated-input";
import { AuthBackground } from "@/components/auth/auth-background";
import { GradientButton } from "@/components/gradient-button";
import { GlassIconButton } from "@/components/ui/glass";
import { getClerkErrorMessage } from "@/lib/clerk-error";
import { hapticButtonPress, hapticNavigation } from "@/lib/haptics";
import styles from "@/lib/styles/auth";
import { useTheme } from "@/hooks/use-theme";
import { Gradients } from "@/lib/theme";

export default function ForgotPasswordPage() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const isValidEmail = useMemo(() => emailAddress.length > 0, [emailAddress]);
	const isValidReset = useMemo(
		() => code.length > 0 && password.length > 0,
		[code, password],
	);

	const onRequestReset = useCallback(async () => {
		if (!isLoaded) return;

		setLoading(true);
		setError("");
		hapticButtonPress();

		try {
			await signIn.create({
				strategy: "reset_password_email_code",
				identifier: emailAddress,
			});
			setSuccessfulCreation(true);
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [isLoaded, signIn, emailAddress]);

	const onResetPassword = useCallback(async () => {
		if (!isLoaded) return;

		setLoading(true);
		setError("");
		hapticButtonPress();

		try {
			const result = await signIn.attemptFirstFactor({
				strategy: "reset_password_email_code",
				code,
				password,
			});

			if (result.status === "complete") {
				await setActive({
					session: result.createdSessionId,
					navigate: async ({ session }) => {
						if (session?.currentTask) {
							console.log(session?.currentTask);
							return;
						}
						router.replace("/");
					},
				});
			} else {
				console.error(JSON.stringify(result, null, 2));
			}
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [isLoaded, signIn, setActive, router, code, password]);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[styles.container, { backgroundColor: colors.surface }]}>
				<AuthBackground showHearts={!successfulCreation} />

				<View
					style={{
						position: "absolute",
						top: insets.top + 12,
						left: 16,
						zIndex: 10,
					}}
				>
					<GlassIconButton
						icon={
							<Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
						}
						onPress={() => router.back()}
					/>
				</View>

				<View
					style={[
						styles.contentWrapper,
						{ paddingTop: insets.top + 60, paddingBottom: insets.bottom + 24 },
					]}
				>
					{successfulCreation ? (
						<>
							{/* Reset Password Header */}
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
										<SymbolView
											name="lock.rotation"
											size={38}
											tintColor="#FFFFFF"
										/>
									</LinearGradient>
								</View>
								<Text style={[styles.logoText, { color: colors.textPrimary }]}>
									Reset Password
								</Text>
								<Text style={[styles.logoTagline, { color: colors.textSecondary }]}>
									Enter the code sent to your email and your new password
								</Text>
							</Animated.View>

							{/* Reset Inputs */}
							<Animated.View
								entering={FadeInDown.delay(300).duration(700).springify()}
								style={styles.inputSection}
							>
								<AnimatedInput
									icon="number"
									colors={colors}
									placeholder="Verification code"
									value={code}
									onChangeText={setCode}
									keyboardType="numeric"
								/>
								<AnimatedInput
									icon="lock.fill"
									colors={colors}
									placeholder="New password"
									value={password}
									onChangeText={setPassword}
									secureTextEntry
									autoComplete="new-password"
								/>

								{error ? (
									<Animated.View
										entering={FadeInDown.duration(300)}
										style={[
											styles.errorContainer,
											{ backgroundColor: colors.errorBg },
										]}
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

							{/* Reset Button */}
							<Animated.View
								entering={FadeInUp.delay(400).duration(700).springify()}
								style={[styles.bottomSection, { marginTop: 40 }]}
							>
								<GradientButton
									onPress={onResetPassword}
									disabled={loading || !isValidReset}
									loading={loading}
									loadingText="Resetting..."
									icon="checkmark"
								>
									Reset Password
								</GradientButton>
							</Animated.View>
						</>
					) : (
						<>
							{/* Request Reset Header */}
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
										<SymbolView
											name="lock.fill"
											size={42}
											tintColor="#FFFFFF"
										/>
									</LinearGradient>
								</View>
								<Text style={[styles.logoText, { color: colors.textPrimary }]}>
									Forgot Password
								</Text>
								<Text style={[styles.logoTagline, { color: colors.textSecondary }]}>
									Enter your email to receive a reset code
								</Text>
							</Animated.View>

							{/* Request Inputs */}
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

								{error ? (
									<Animated.View
										entering={FadeInDown.duration(300)}
										style={[
											styles.errorContainer,
											{ backgroundColor: colors.errorBg },
										]}
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
									onPress={onRequestReset}
									disabled={loading || !isValidEmail}
									loading={loading}
									loadingText="Sending code..."
									icon="paperplane.fill"
								>
									Send Reset Code
								</GradientButton>

								<View style={styles.signUpContainer}>
									<Text style={[styles.signUpText, { color: colors.textTertiary }]}>
										Remember your password?
									</Text>
									<Pressable
										style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
										onPress={() => {
											hapticNavigation();
											router.back();
										}}
									>
										<Text style={[styles.signUpLink, { color: colors.accentLink }]}>
											Sign In
										</Text>
									</Pressable>
								</View>
							</Animated.View>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
