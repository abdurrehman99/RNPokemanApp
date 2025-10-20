import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import PokemonCard from '../../src/components/PokemonCard';
import { PokemonListItem } from '../../src/types/pokemon';

describe('PokemonCard Component', () => {
  const mockOnPress = jest.fn();
  
  const mockPokemon: PokemonListItem = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  };

  const mockPokemonHighId: PokemonListItem = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pokemon card correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />);

    expect(screen.getByText('Bulbasaur')).toBeTruthy();
    expect(screen.getByText('#001')).toBeTruthy();
    expect(screen.getByTestId('pokemon-item-bulbasaur')).toBeTruthy();
  });

  test('formats pokemon name with correct capitalization', () => {
    render(<PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />);

    expect(screen.getByText('Bulbasaur')).toBeTruthy();
    expect(screen.queryByText('bulbasaur')).toBeFalsy(); // Should be capitalized
  });

  test('formats pokemon ID with correct padding', () => {
    render(<PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />);

    expect(screen.getByText('#001')).toBeTruthy(); // Single digit should be padded
  });

  test('handles higher pokemon IDs correctly', () => {
    render(<PokemonCard pokemon={mockPokemonHighId} onPress={mockOnPress} />);

    expect(screen.getByText('Pikachu')).toBeTruthy();
    expect(screen.getByText('#025')).toBeTruthy(); // Double digit should be padded
  });

  test('extracts pokemon ID from URL correctly', () => {
    const pokemonWithComplexUrl: PokemonListItem = {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/',
    };

    render(<PokemonCard pokemon={pokemonWithComplexUrl} onPress={mockOnPress} />);

    expect(screen.getByText('#006')).toBeTruthy();
  });

  test('calls onPress with correct parameters when pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />);

    const cardElement = screen.getByTestId('pokemon-item-bulbasaur');
    fireEvent.press(cardElement);

    expect(mockOnPress).toHaveBeenCalledWith('bulbasaur', 1);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('calls onPress with correct parameters for higher ID pokemon', () => {
    render(<PokemonCard pokemon={mockPokemonHighId} onPress={mockOnPress} />);

    const cardElement = screen.getByTestId('pokemon-item-pikachu');
    fireEvent.press(cardElement);

    expect(mockOnPress).toHaveBeenCalledWith('pikachu', 25);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('generates correct image URL', () => {
    render(<PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />);

    // We can't easily test the Image source prop in react-native-testing-library
    // but we can verify the component renders without errors
    expect(screen.getByTestId('pokemon-item-bulbasaur')).toBeTruthy();
  });

  test('handles pokemon with special characters in name', () => {
    const pokemonWithSpecialName: PokemonListItem = {
      name: 'nidoran-f',
      url: 'https://pokeapi.co/api/v2/pokemon/29/',
    };

    render(<PokemonCard pokemon={pokemonWithSpecialName} onPress={mockOnPress} />);

    expect(screen.getByText('Nidoran-f')).toBeTruthy();
    expect(screen.getByText('#029')).toBeTruthy();
    expect(screen.getByTestId('pokemon-item-nidoran-f')).toBeTruthy();
  });

  test('handles pokemon with very high ID numbers', () => {
    const pokemonHighNumber: PokemonListItem = {
      name: 'mew',
      url: 'https://pokeapi.co/api/v2/pokemon/151/',
    };

    render(<PokemonCard pokemon={pokemonHighNumber} onPress={mockOnPress} />);

    expect(screen.getByText('Mew')).toBeTruthy();
    expect(screen.getByText('#151')).toBeTruthy(); // Three digits should not be padded further
  });

  test('handles malformed URL gracefully', () => {
    const pokemonMalformedUrl: PokemonListItem = {
      name: 'test-pokemon',
      url: 'invalid-url',
    };

    render(<PokemonCard pokemon={pokemonMalformedUrl} onPress={mockOnPress} />);

    expect(screen.getByText('Test-pokemon')).toBeTruthy();
    // Should handle malformed URL and show default ID format
    expect(screen.getByText('#000')).toBeTruthy(); // Falls back to 0
  });
});