# Pokemon App - React Native with Redux Toolkit

A comprehensive React Native application built with Expo, featuring a Pokemon list and details viewer. This app demonstrates clean architecture, state management with Redux Toolkit, persistent storage, and comprehensive testing.

## Features

- **Pokemon List**: Browse through a paginated list of Pokemon with images
- **Pokemon Details**: View detailed information including stats, types, abilities, and more
- **Offline Storage**: Data persistence using Redux Persist and AsyncStorage
- **Clean Architecture**: Well-organized code structure with separation of concerns
- **Comprehensive Testing**: Unit and integration tests with 60%+ coverage
- **Environment Configuration**: Configurable API base URLs for different environments
- **Type Safety**: Full TypeScript implementation with strict typing
- **Responsive UI**: Modern, clean interface with smooth navigation

## Tech Stack

- **React Native** (0.81.4)
- **Expo** (54.0.13)
- **Redux Toolkit** with RTK Query for state management
- **React Navigation** (Native Stack Navigator)
- **AsyncStorage** for persistence
- **TypeScript** for type safety
- **Jest** and React Native Testing Library for testing

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (16.x or higher)
- **npm** or **yarn**
- **Expo CLI** installed globally: `npm install -g @expo/cli`
- **iOS Simulator** (for iOS development) or **Android Studio** (for Android development)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd RNPokemanApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration

The app supports configurable API base URLs through environment variables:

#### Option 1: Use default configuration
The app comes with pre-configured Pokemon API endpoints. No additional setup required.

#### Option 2: Configure custom API endpoints
Create or modify the environment files:

```bash
# .env.development
EXPO_PUBLIC_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2

# .env.production  
EXPO_PUBLIC_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2
```

### 4. Start the application

#### Development Mode
```bash
# Start with default environment
npm start

# Start with development environment
npm run start:dev

# Start with production environment
npm run start:prod
```

#### Platform-specific Development
```bash
# iOS (Development)
npm run ios:dev

# Android (Development)
npm run android:dev

# Web
npm run web
```

## 🧪 Testing

This project includes comprehensive testing with Jest and React Native Testing Library.

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI (without watch mode)
npm run test:ci
```

### Test Coverage
The project maintains **60%+ test coverage** across:
- **Unit Tests**: Components, screens, and utilities
- **Integration Tests**: Redux store, API services, and navigation
- **Snapshot Tests**: UI component consistency

### Test Files Structure
```
__tests__/
├── components/
│   └── PokemonList.test.tsx
├── screens/
│   ├── PokemonListScreen.test.tsx
│   └── PokemonDetailsScreen.test.tsx
├── services/
│   └── pokemonApiIntegration.test.ts
└── setup.js
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── PokemonList.tsx
├── screens/            # Screen components
│   ├── PokemonListScreen.tsx
│   └── PokemonDetailsScreen.tsx
├── services/           # API services
│   └── pokemonApi.ts
├── store/              # Redux store configuration
│   ├── store.ts
│   └── hooks.ts
└── types/              # TypeScript type definitions
    └── pokemon.ts
```

## Navigation Flow

1. **Pokemon List Screen**: Displays a paginated list of Pokemon
2. **Pokemon Details Screen**: Shows detailed information when a Pokemon is selected

## API Configuration

### Supported Endpoints

The app integrates with the Pokemon API:

- **GET** `/pokemon/` - Fetch paginated Pokemon list
- **GET** `/pokemon/{id}` - Fetch Pokemon details by ID
- **GET** `/pokemon/{name}` - Fetch Pokemon details by name

### Changing API Base URL

#### Method 1: Environment Variables
```bash
# Set environment variable before starting
EXPO_PUBLIC_POKEMON_API_BASE_URL=https://your-custom-api.com npm start
```

#### Method 2: Modify app.json
```json
{
  "expo": {
    "extra": {
      "POKEMON_API_BASE_URL": "https://your-custom-api.com"
    }
  }
}
```

#### Method 3: Update .env files
```bash
# .env
EXPO_PUBLIC_POKEMON_API_BASE_URL=https://your-custom-api.com
```

## Key Dependencies

### Core Dependencies
- `@reduxjs/toolkit`: State management
- `react-redux`: React bindings for Redux
- `@react-native-async-storage/async-storage`: Local storage
- `redux-persist`: State persistence
- `@react-navigation/native`: Navigation
- `@react-navigation/native-stack`: Stack navigator

### Development Dependencies
- `@testing-library/react-native`: Testing utilities
- `jest`: Testing framework
- `typescript`: Type checking

## Build & Deployment

### Development Build
```bash
# iOS
expo build:ios

# Android
expo build:android
```

### Production Build
```bash
# Set production environment
NODE_ENV=production

# Build for iOS
expo build:ios --release-channel production

# Build for Android
expo build:android --release-channel production
```

## Performance Optimizations

- **Redux Persist**: Caches API responses for offline access
- **RTK Query**: Automatic caching and deduplication of API calls
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Efficient image loading with fallbacks
- **Memory Management**: Proper cleanup of subscriptions and listeners

## Code Quality

### Code Formatting
The project follows consistent code formatting guidelines:
- 2-space indentation
- Single quotes for strings
- Trailing commas
- Semicolons required

## Troubleshooting

### Common Issues

#### 1. Metro bundler issues
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### 2. iOS simulator issues
```bash
# Reset iOS simulator
xcrun simctl erase all
```

#### 3. Android emulator issues
```bash
# Clean and rebuild
cd android && ./gradlew clean && cd ..
```

#### 4. Package conflicts
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Issues

If you encounter API connection issues:

1. Verify the `EXPO_PUBLIC_POKEMON_API_BASE_URL` is correctly set
2. Check your internet connection
3. Ensure the API endpoint is accessible
4. Check console logs for detailed error messages

### Testing Issues

If tests fail:

1. Clear Jest cache: `npm test -- --clearCache`
2. Update snapshots: `npm test -- --updateSnapshot`
3. Check test setup in `__tests__/setup.js`

## Acknowledgments

- [Pokemon API](https://pokeapi.co/) for providing the Pokemon data
- [Expo](https://expo.dev/) for the amazing React Native platform
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplified state management