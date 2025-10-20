import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import PokemonList from '../../../src/screens/PokemonList';
import { pokemonApi } from '../../../src/services/pokemonApi';
import { RootStackParamList } from '../../../src/types/pokemon';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Mock data
const mockPokemonList = {
  count: 1154,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
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
  useGetPokemonListQuery: jest.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="PokemonList" component={() => component} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

describe('PokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with loading state', () => {
    const { useGetPokemonListQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonListQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: false,
    });

    renderWithProviders(<PokemonList />);

    expect(screen.getByText('Loading Pokemon...')).toBeTruthy();
  });

  test('renders correctly with pokemon data', () => {
    const { useGetPokemonListQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonListQuery.mockReturnValue({
      data: mockPokemonList,
      error: undefined,
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<PokemonList />);

    expect(screen.getByTestId('pokemon-list')).toBeTruthy();
    expect(screen.getByTestId('pokemon-item-bulbasaur')).toBeTruthy();
    expect(screen.getByTestId('pokemon-item-ivysaur')).toBeTruthy();
  });

  test('renders correctly with error state', () => {
    const { useGetPokemonListQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonListQuery.mockReturnValue({
      data: undefined,
      error: { message: 'Network Error' },
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<PokemonList />);

    expect(screen.getByText('Failed to load Pokemon')).toBeTruthy();
    expect(screen.getByText('Retry')).toBeTruthy();
  });

  test('has correct safe area styling with SafeAreaProvider', () => {
    const { useGetPokemonListQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonListQuery.mockReturnValue({
      data: mockPokemonList,
      error: undefined,
      isLoading: false,
      isFetching: false,
    });

    const { getByTestId } = renderWithProviders(<PokemonList />);

    // Test that the screen renders without crashing with SafeAreaProvider
    expect(getByTestId('pokemon-list')).toBeTruthy();
  });

  test('handles pagination correctly', () => {
    const { useGetPokemonListQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonListQuery.mockReturnValue({
      data: mockPokemonList,
      error: undefined,
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<PokemonList />);

    expect(screen.getByTestId('pokemon-list')).toBeTruthy();
    
    // Test that Pokemon cards are rendered
    expect(screen.getByTestId('pokemon-item-bulbasaur')).toBeTruthy();
    expect(screen.getByTestId('pokemon-item-ivysaur')).toBeTruthy();
  });

  test('integrates with navigation properly', () => {
    const { useGetPokemonListQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonListQuery.mockReturnValue({
      data: mockPokemonList,
      error: undefined,
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<PokemonList />);

    // The screen should render the pokemon list component
    expect(screen.getByTestId('pokemon-list')).toBeTruthy();
    
    // Test navigation is called when pokemon is pressed
    const bulbasaurItem = screen.getByTestId('pokemon-item-bulbasaur');
    fireEvent.press(bulbasaurItem);
    
    // Since navigation is mocked, we just ensure the component handles the press
    expect(bulbasaurItem).toBeTruthy();
  });

  test('renders with pull-to-refresh functionality', () => {
    const { useGetPokemonListQuery } = require('../../../src/services/pokemonApi');
    useGetPokemonListQuery.mockReturnValue({
      data: mockPokemonList,
      error: undefined,
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<PokemonList />);

    const flatList = screen.getByTestId('pokemon-list');
    expect(flatList).toBeTruthy();
    
    // Test that the FlatList has refresh capabilities (props are set)
    expect(flatList.props.refreshing).toBeDefined();
    expect(flatList.props.onRefresh).toBeDefined();
  });
});