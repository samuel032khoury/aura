export function getClerkErrorMessage(err: unknown): string {
	const fallback = "Something went wrong. Please try again.";

	if (
		err &&
		typeof err === "object" &&
		"errors" in err &&
		Array.isArray((err as { errors: unknown[] }).errors)
	) {
		const first = (
			err as { errors: Array<{ longMessage?: string; message?: string }> }
		).errors[0];
		return first?.longMessage || first?.message || fallback;
	}

	return fallback;
}
