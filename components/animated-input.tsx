import * as Haptics from "expo-haptics";
import { SymbolView } from "expo-symbols";
import React, { type ComponentProps, useCallback, useState } from "react";
import {
	Pressable,
	StyleSheet,
	TextInput,
	type TextInputProps,
	View,
} from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { AuthTheme } from "@/lib/theme";

type AnimatedInputProps = {
	icon: ComponentProps<typeof SymbolView>["name"];
	theme: AuthTheme;
	secureTextEntry?: boolean;
} & Pick<
	TextInputProps,
	| "placeholder"
	| "value"
	| "onChangeText"
	| "autoCapitalize"
	| "keyboardType"
	| "autoComplete"
>;

export function AnimatedInput({
	icon,
	theme,
	secureTextEntry = false,
	...textInputProps
}: AnimatedInputProps) {
	const inputRef = React.useRef<TextInput>(null);
	const [focused, setFocused] = useState(false);
	const [secretVisible, setSecretVisible] = useState(false);
	const focusAnim = useSharedValue(0);

	const containerStyle = useAnimatedStyle(() => ({
		borderColor: interpolateColor(
			focusAnim.value,
			[0, 1],
			["transparent", "#FF6B6B"],
		),
		backgroundColor: interpolateColor(
			focusAnim.value,
			[0, 1],
			[theme.inputBg, theme.inputBgFocused],
		),
	}));

	const handleFocus = useCallback(() => {
		setFocused(true);
		focusAnim.value = withTiming(1, { duration: 150 });
	}, [focusAnim]);

	const handleBlur = useCallback(() => {
		setFocused(false);
		focusAnim.value = withTiming(0, { duration: 150 });
	}, [focusAnim]);

	return (
		<Pressable onPress={() => inputRef.current?.focus()}>
			<Animated.View style={[styles.container, containerStyle]}>
				<View style={styles.iconContainer}>
					<SymbolView
						name={icon}
						size={20}
						tintColor={focused ? "#FF6B6B" : theme.iconDefault}
					/>
				</View>
				<TextInput
					ref={inputRef}
					onFocus={handleFocus}
					onBlur={handleBlur}
					secureTextEntry={secureTextEntry && !secretVisible}
					style={[styles.input, { color: theme.textPrimary }]}
					placeholderTextColor={theme.placeholder}
					{...textInputProps}
				/>
				{secureTextEntry && (
					<Pressable
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
							setSecretVisible((v) => !v);
						}}
						style={styles.eyeButton}
					>
						<SymbolView
							name={secretVisible ? "eye.slash.fill" : "eye.fill"}
							size={20}
							tintColor={theme.iconDefault}
						/>
					</Pressable>
				)}
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 56,
		borderRadius: 16,
		borderCurve: "continuous",
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent",
	},
	iconContainer: {
		width: 52,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		flex: 1,
		height: "100%",
		fontSize: 16,
		paddingRight: 16,
	},
	eyeButton: {
		width: 48,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
