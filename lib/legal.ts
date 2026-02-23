/** Legal document content rendered in the legal form sheet. */

export const legalDocuments = {
	tos: {
		title: "Terms of Service",
		lastUpdated: "February 23, 2026",
		sections: [
			{
				heading: "1. Eligibility",
				body: "You must be at least 18 years old to use Aura. By using the app, you represent and warrant that you meet this age requirement.",
			},
			{
				heading: "2. Account Registration",
				body: "You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
			},
			{
				heading: "3. Acceptable Use",
				body: "You agree not to: impersonate any person or misrepresent your identity; upload content that is offensive, abusive, or violates any law; harass, threaten, or intimidate other users; use the app for any commercial or promotional purposes without authorization; or attempt to reverse-engineer, decompile, or exploit the app.",
			},
			{
				heading: "4. User Content",
				body: "You retain ownership of content you post. By posting content on Aura, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with the service.",
			},
			{
				heading: "5. Matching & Interactions",
				body: "Aura facilitates introductions between users. We do not guarantee compatibility or the outcome of any interaction. You are solely responsible for your interactions with other users.",
			},
			{
				heading: "6. Safety",
				body: "We encourage users to exercise caution when meeting in person. Always meet in public places and inform someone you trust about your plans.",
			},
			{
				heading: "7. Subscription & Payments",
				body: "Some features may require a paid subscription. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing period. Refunds are handled in accordance with the policies of the App Store or Google Play.",
			},
			{
				heading: "8. Termination",
				body: "We may suspend or terminate your account at any time if you violate these Terms or engage in conduct that we determine to be harmful to other users or the service.",
			},
			{
				heading: "9. Disclaimers",
				body: 'Aura is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service.',
			},
			{
				heading: "10. Limitation of Liability",
				body: "To the maximum extent permitted by law, Aura shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.",
			},
			{
				heading: "11. Changes to Terms",
				body: "We may update these Terms from time to time. Continued use of the app after changes constitutes acceptance of the revised Terms.",
			},
			{
				heading: "12. Contact",
				body: "If you have questions about these Terms, contact us at support@aura.app.",
			},
		],
	},
	privacy: {
		title: "Privacy Policy",
		lastUpdated: "February 23, 2026",
		sections: [
			{
				heading: "1. Information We Collect",
				body: "We collect information you provide (account details, profile information, messages) and information collected automatically (device information, usage data, approximate location with your permission).",
			},
			{
				heading: "2. How We Use Your Information",
				body: "We use your information to create and manage your account, show you relevant matches, facilitate communication, improve your experience, send service-related notifications, and detect and prevent fraud or abuse.",
			},
			{
				heading: "3. Sharing Your Information",
				body: "We do not sell your personal information. We may share data with other users (your profile), service providers (hosting, analytics, payments), and when required by law.",
			},
			{
				heading: "4. Data Retention",
				body: "We retain your data for as long as your account is active. You can request deletion of your account and associated data at any time.",
			},
			{
				heading: "5. Security",
				body: "We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.",
			},
			{
				heading: "6. Your Rights",
				body: "Depending on your location, you may have the right to access, correct, delete, object to processing of, or export your personal data.",
			},
			{
				heading: "7. Cookies & Tracking",
				body: "Our mobile app may use local storage and analytics tools to improve performance. We do not use third-party advertising trackers.",
			},
			{
				heading: "8. Children's Privacy",
				body: "Aura is not intended for anyone under 18. We do not knowingly collect information from minors.",
			},
			{
				heading: "9. Changes to This Policy",
				body: "We may update this Privacy Policy periodically. We will notify you of material changes through the app or by email.",
			},
			{
				heading: "10. Contact",
				body: "For privacy-related inquiries, contact us at privacy@aura.app.",
			},
		],
	},
} as const;

export type LegalDocumentType = keyof typeof legalDocuments;
