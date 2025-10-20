import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../src/services/pokemonApi';

describe('Pokemon API Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Create a fresh store for each test
    store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up the store
    store.dispatch(pokemonApi.util.resetApiState());
  });

  describe('API Configuration', () => {
    test('pokemonApi reducer is properly configured', () => {
      const state = store.getState() as any;
      expect(state.pokemonApi).toBeDefined();
    });

    test('pokemonApi has correct reducerPath', () => {
      expect(pokemonApi.reducerPath).toBe('pokemonApi');
    });

    test('pokemonApi has correct endpoints', () => {
      expect(pokemonApi.endpoints.getPokemonList).toBeDefined();
      expect(pokemonApi.endpoints.getPokemonById).toBeDefined();
      expect(pokemonApi.endpoints.getPokemonByName).toBeDefined();
    });
  });

  describe('API Endpoint Generation', () => {
    test('getPokemonList endpoint has correct name', () => {
      const endpoint = pokemonApi.endpoints.getPokemonList;
      expect(endpoint.name).toBe('getPokemonList');
    });

    test('getPokemonById endpoint has correct name', () => {
      const endpoint = pokemonApi.endpoints.getPokemonById;
      expect(endpoint.name).toBe('getPokemonById');
    });

    test('getPokemonByName endpoint has correct name', () => {
      const endpoint = pokemonApi.endpoints.getPokemonByName;
      expect(endpoint.name).toBe('getPokemonByName');
    });
  });

  describe('Redux Store Integration', () => {
    test('store initializes with pokemonApi slice', () => {
      const initialState = store.getState() as any;
      expect(initialState).toHaveProperty('pokemonApi');
      expect(initialState.pokemonApi).toHaveProperty('queries');
      expect(initialState.pokemonApi).toHaveProperty('mutations');
    });

    test('API slice provides expected hooks', () => {
      expect(pokemonApi.useGetPokemonListQuery).toBeDefined();
      expect(pokemonApi.useGetPokemonByIdQuery).toBeDefined();
      expect(pokemonApi.useGetPokemonByNameQuery).toBeDefined();
      expect(pokemonApi.useLazyGetPokemonByIdQuery).toBeDefined();
      expect(pokemonApi.useLazyGetPokemonByNameQuery).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    test('store handles actions without crashing', () => {
      const errorAction = {
        type: `${pokemonApi.reducerPath}/executeQuery/rejected`,
        payload: { error: 'Network error' },
      };
      
      // The store should handle error actions without crashing
      expect(() => store.dispatch(errorAction as any)).not.toThrow();
    });
  });

  describe('Caching Configuration', () => {
    test('API provides correct tag types for caching', () => {
      expect((pokemonApi as any).tagTypes).toContain('Pokemon');
      expect((pokemonApi as any).tagTypes).toContain('PokemonList');
    });
  });
});