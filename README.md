# Aura

> **⚠️ Work In Progress (WIP)**
> This application is currently under active development. Features, UI, and functionality are subject to change.

Aura is a modern React Native application built with Expo. It is a Tinder-style dating app with an AI matchmaker built in. Instead of random swiping, the app uses OpenAI embeddings to find people with similar interests and personalities.

## Features Preview

- **Vector Embeddings**: Your profile (bio + interests) gets converted into a list of 1,536 numbers. People with similar numbers = similar personalities!
- **Real-time Subscriptions**: When someone messages you, it appears instantly - no refresh needed. Convex handles this automatically.
- **Compatibility Scoring**: The AI compares your "number list" with others and ranks them by similarity. Higher score = better match!

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

2. Start the development server:

   ```bash
   npx expo start
   # or
   bunx expo start
   ```

## Tech Stack

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [Clerk](https://clerk.com) for Authentication
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) for Animations
- [OpenAI](https://openai.com)

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** License. See the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This project uses the following open-source software:

- **Expo**: [MIT License](https://opensource.org/licenses/MIT)
- **React Native**: [MIT License](https://opensource.org/licenses/MIT)
- **Clerk**: [MIT License](https://opensource.org/licenses/MIT)
- **React Native Reanimated**: [MIT License](https://opensource.org/licenses/MIT)
- **OpenAI Node.js**: [MIT License](https://opensource.org/licenses/MIT)
EOF