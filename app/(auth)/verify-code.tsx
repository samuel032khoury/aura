import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthBackground } from "@/components/auth/auth-background";
import { CodeVerification } from "@/components/auth/code-verification";
import { GlassIconButton } from "@/components/ui/glass";
import { useVerifyCode } from "@/hooks/use-verify-code";
import styles from "@/lib/styles/auth";
import { useTheme } from "@/hooks/use-theme";

export default function VerifyCodePage() {
	const { type, email } = useLocalSearchParams<{
		type: "sign-in" | "sign-up";
		email: string;
	}>();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();

	const {
		code,
		setCode,
		error,
		loading,
		handleVerify,
		handleResend,
		resending,
		resent,
	} = useVerifyCode(type ?? "sign-up");

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[styles.container, { backgroundColor: colors.surface }]}>
				<AuthBackground />

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
							<Ionicons
								name="chevron-back"
								size={22}
								color={colors.textPrimary}
							/>
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
					<CodeVerification
						colors={colors}
						code={code}
						setCode={setCode}
						error={error}
						loading={loading}
						onVerify={handleVerify}
						email={email}
						onResend={handleResend}
						resending={resending}
						resent={resent}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
