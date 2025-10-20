import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PokemonListItem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onPress: (name: string, id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  const getPokemonId = (url: string): number => {
    const parts = url.split('/').filter(Boolean);
    const id = parseInt(parts[parts.length - 1] || '0', 10);
    return isNaN(id) ? 0 : id;
  };

  const getPokemonImageUrl = (id: number): string => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const pokemonId = getPokemonId(pokemon.url);
  const imageUrl = getPokemonImageUrl(pokemonId);

  return (
    <TouchableOpacity
      style={styles.pokemonItem}
      onPress={() => onPress(pokemon.name, pokemonId)}
      testID={`pokemon-item-${pokemon.name}`}
    >
      <View style={styles.pokemonContent}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.pokemonImage}
          defaultSource={require('../../assets/images/icon.png')}
        />
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonName}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={styles.pokemonId}>#{pokemonId.toString().padStart(3, '0')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pokemonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  pokemonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
  },
  pokemonInfo: {
    marginLeft: 16,
    flex: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
});

export default PokemonCard;