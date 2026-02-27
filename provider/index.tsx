import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider } from "./ClerkProvider";
import { ConvexProvider } from "./ConvexProvider";

export default function AppProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ClerkProvider>
				<ConvexProvider>{children}</ConvexProvider>
			</ClerkProvider>
		</GestureHandlerRootView>
	);
}
