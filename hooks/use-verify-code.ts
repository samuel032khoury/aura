import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { getClerkErrorMessage } from "@/lib/clerk-error";
import { hapticButtonPress } from "@/lib/haptics";

export function useVerifyCode(type: "sign-in" | "sign-up") {
	const {
		isLoaded: isSignInLoaded,
		signIn,
		setActive: setSignInActive,
	} = useSignIn();
	const {
		isLoaded: isSignUpLoaded,
		signUp,
		setActive: setSignUpActive,
	} = useSignUp();
	const router = useRouter();

	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [resending, setResending] = useState(false);
	const [resent, setResent] = useState(false);

	const isLoaded = type === "sign-in" ? isSignInLoaded : isSignUpLoaded;

	const handleResend = useCallback(async () => {
		if (!isLoaded || resending) return;

		setResending(true);
		setError("");
		hapticButtonPress();

		try {
			if (type === "sign-up") {
				await signUp?.prepareEmailAddressVerification({
					strategy: "email_code",
				});
			} else {
				await signIn?.prepareSecondFactor({
					strategy: "email_code",
				});
			}
			setResent(true);
			setTimeout(() => setResent(false), 3000);
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setResending(false);
		}
	}, [isLoaded, type, signIn, signUp, resending]);

	const handleVerify = useCallback(async () => {
		if (!isLoaded) return;

		setLoading(true);
		setError("");
		hapticButtonPress();

		try {
			const navigate = async ({
				session,
			}: {
				session: { currentTask?: unknown } | null;
			}) => {
				if (session?.currentTask) {
					console.log(session.currentTask);
					return;
				}
				router.replace("/");
			};

			if (type === "sign-in") {
				const attempt = await signIn?.attemptSecondFactor({
					strategy: "email_code",
					code,
				});
				if (attempt?.status === "complete") {
					await setSignInActive?.({
						session: attempt.createdSessionId,
						navigate,
					});
				} else {
					console.error(JSON.stringify(attempt, null, 2));
					setError("Verification failed. Please try again.");
				}
			} else {
				const attempt = await signUp?.attemptEmailAddressVerification({ code });
				if (attempt?.status === "complete") {
					await setSignUpActive?.({
						session: attempt.createdSessionId,
						navigate,
					});
				} else {
					console.error(JSON.stringify(attempt, null, 2));
					setError("Verification failed. Please try again.");
				}
			}
		} catch (err: unknown) {
			setError(getClerkErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [
		isLoaded,
		type,
		signIn,
		signUp,
		setSignInActive,
		setSignUpActive,
		router,
		code,
	]);

	return {
		code,
		setCode,
		error,
		setError,
		loading,
		handleVerify,
		handleResend,
		resending,
		resent,
	};
}
