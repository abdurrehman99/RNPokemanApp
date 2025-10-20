import 'react-native-gesture-handler/jestSetup';
import '@testing-library/react-native/extend-expect';

// Mock react-native modules
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo Constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      POKEMON_API_BASE_URL: 'https://pokeapi.co/api/v2'
    }
  }
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        pokemonName: 'pikachu',
        pokemonId: 25,
      },
    }),
  };
});

// Mock Image component
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Image = ({ children, ...props }) => React.createElement('Image', props, children);
  return RN;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.__reanimatedWorkletInit = jest.fn();