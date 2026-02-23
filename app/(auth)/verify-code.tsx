import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthBackground } from "@/components/auth/auth-background";
import { CodeVerification } from "@/components/auth/code-verification";
import { GlassIconButton } from "@/components/ui/glass";
import { useVerifyCode } from "@/hooks/use-verify-code";
import styles from "@/lib/styles/auth";
import { useAuthTheme } from "@/lib/theme";

export default function VerifyCodePage() {
	const { type } = useLocalSearchParams<{ type: "sign-in" | "sign-up" }>();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const t = useAuthTheme();

	const { code, setCode, error, loading, handleVerify } = useVerifyCode(
		type ?? "sign-up",
	);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={[styles.container, { backgroundColor: t.surface }]}>
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
							<Ionicons name="chevron-back" size={22} color={t.textPrimary} />
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
						theme={t}
						code={code}
						setCode={setCode}
						error={error}
						loading={loading}
						onVerify={handleVerify}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
