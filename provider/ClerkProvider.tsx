import {
	ClerkLoaded,
	ClerkProvider as ClerkProviderBase,
} from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/auth";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
	throw new Error("Missing Clerk Publishable Key in environment variables");
}

interface ClerkProviderProps {
	children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
	return (
		<ClerkProviderBase
			publishableKey={clerkPublishableKey}
			tokenCache={tokenCache}
		>
			<ClerkLoaded>{children}</ClerkLoaded>
		</ClerkProviderBase>
	);
}
