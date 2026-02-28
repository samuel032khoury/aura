import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppThemeProvider } from "@/lib/theme";
import { ClerkProvider } from "./ClerkProvider";
import { ConvexProvider } from "./ConvexProvider";

export default function AppProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AppThemeProvider>
				<ClerkProvider>
					<ConvexProvider>{children}</ConvexProvider>
				</ClerkProvider>
			</AppThemeProvider>
		</GestureHandlerRootView>
	);
}
