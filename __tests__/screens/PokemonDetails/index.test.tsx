import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PokemonDetails from '../../../src/screens/PokemonDetails';
import { pokemonApi } from '../../../src/services/pokemonApi';
import { RootStackParamList } from '../../../src/types/pokemon';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Mock Pokemon data
const mockPokemonData = {
  id: 25,
  name: 'pikachu',
  base_experience: 112,
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    front_shiny: null,
    back_default: null,
    back_shiny: null,
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 40,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeAPI.co/api/v2/stat/3/',
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: 'static',
        url: 'https://pokeapi.co/api/v2/ability/9/',
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: 'lightning-rod',
        url: 'https://pokeapi.co/api/v2/ability/31/',
      },
      is_hidden: true,
      slot: 3,
    },
  ],
};

// Create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

// Mock the API hook
jest.mock('../../../src/services/pokemonApi', () => ({
  ...jest.requireActual('../../../src/services/pokemonApi'),
  useGetPokemonByIdQuery: jest.fn(),
}));

// Mock the navigation route
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {
      pokemonName: 'pikachu',
      pokemonId: 25,
    },
  }),
  useNavigation: () => ({
    setOptions: jest.fn(),
    goBack: jest.fn(),
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="PokemonDetails" 
              component={() => component} 
              initialParams={{ pokemonName: 'pikachu', pokemonId: 25 }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

describe('PokemonDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state correctly', () => {
    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    expect(screen.getByText('Loading Pokemon details...')).toBeTruthy();
  });

  test('renders error state correctly', () => {
    const mockRefetch = jest.fn();
    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      error: { message: 'Network Error' },
      isLoading: false,
      refetch: mockRefetch,
    });

    renderWithProviders(<PokemonDetails />);

    expect(screen.getByText('Failed to load Pokemon details')).toBeTruthy();
    expect(screen.getByText('Retry')).toBeTruthy();
  });

  test('renders pokemon details correctly', async () => {
    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonData,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeTruthy();
      expect(screen.getByText('#025')).toBeTruthy();
      expect(screen.getByText('Types')).toBeTruthy();
      expect(screen.getByText('Electric')).toBeTruthy();
    });
  });

  test('displays basic information correctly', async () => {
    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonData,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      expect(screen.getByText('Basic Information')).toBeTruthy();
      expect(screen.getByText('Height')).toBeTruthy();
      expect(screen.getByText('0.4 m')).toBeTruthy(); // 4 decimeters = 0.4 meters
      expect(screen.getByText('Weight')).toBeTruthy();
      expect(screen.getByText('6.0 kg')).toBeTruthy(); // 60 hectograms = 6.0 kg
      expect(screen.getByText('Base Experience')).toBeTruthy();
      expect(screen.getByText('112')).toBeTruthy();
    });
  });

  test('displays abilities correctly', async () => {
    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonData,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      expect(screen.getByText('Abilities')).toBeTruthy();
      expect(screen.getByText('Static')).toBeTruthy();
      expect(screen.getByText('Lightning Rod (Hidden)')).toBeTruthy();
    });
  });

  test('displays stats correctly', async () => {
    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonData,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      expect(screen.getByText('Stats')).toBeTruthy();
      expect(screen.getByText('Hp')).toBeTruthy();
      expect(screen.getByText('Attack')).toBeTruthy();
      expect(screen.getByText('Defense')).toBeTruthy();
      expect(screen.getByText('35')).toBeTruthy(); // HP stat value
      expect(screen.getByText('55')).toBeTruthy(); // Attack stat value
      expect(screen.getByText('40')).toBeTruthy(); // Defense stat value
    });
  });

  test('formats stat names correctly', async () => {
    const mockPokemonWithComplexStats = {
      ...mockPokemonData,
      stats: [
        {
          base_stat: 90,
          effort: 0,
          stat: {
            name: 'special-attack',
            url: 'https://pokeapi.co/api/v2/stat/4/',
          },
        },
        {
          base_stat: 80,
          effort: 0,
          stat: {
            name: 'special-defense',
            url: 'https://pokeapi.co/api/v2/stat/5/',
          },
        },
      ],
    };

    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonWithComplexStats,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      expect(screen.getByText('Special Attack')).toBeTruthy();
      expect(screen.getByText('Special Defense')).toBeTruthy();
    });
  });

  test('handles pokemon with multiple types', async () => {
    const mockPokemonMultiType = {
      ...mockPokemonData,
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/',
          },
        },
        {
          slot: 2,
          type: {
            name: 'poison',
            url: 'https://pokeapi.co/api/v2/type/4/',
          },
        },
      ],
    };

    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonMultiType,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      expect(screen.getByText('Grass')).toBeTruthy();
      expect(screen.getByText('Poison')).toBeTruthy();
    });
  });

  test('renders correctly with SafeAreaProvider', async () => {
    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonData,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      // Test that SafeAreaProvider doesn't break rendering
      expect(screen.getByText('Pikachu')).toBeTruthy();
      expect(screen.getByText('Types')).toBeTruthy();
    });
  });

  test('handles missing sprite gracefully', async () => {
    const mockPokemonNoSprite = {
      ...mockPokemonData,
      sprites: {
        front_default: null,
        front_shiny: null,
        back_default: null,
        back_shiny: null,
      },
    };

    const { useGetPokemonByIdQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonNoSprite,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithProviders(<PokemonDetails />);

    await waitFor(() => {
      // Should still render other details even without sprite
      expect(screen.getByText('Pikachu')).toBeTruthy();
      expect(screen.getByText('#025')).toBeTruthy();
    });
  });
});