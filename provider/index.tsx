import type React from "react";
import { ClerkProvider } from "./ClerkProvider";

export default function AppProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ClerkProvider>{children}</ClerkProvider>;
}
