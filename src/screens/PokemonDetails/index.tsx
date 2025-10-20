import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, getPokemonTypeColor, getStatBarColor } from '../../constants/colors';
import { useGetPokemonByIdQuery } from '../../services/pokemonApi';
import { RootStackParamList } from '../../types/pokemon';
import { styles } from './styles';

type PokemonDetailsRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;
type PokemonDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PokemonDetails'
>;

const PokemonDetails: React.FC = () => {
  const route = useRoute<PokemonDetailsRouteProp>();
  const navigation = useNavigation<PokemonDetailsNavigationProp>();
  const { pokemonName, pokemonId } = route.params;

  const {
    data: pokemon,
    error,
    isLoading,
    refetch,
  } = useGetPokemonByIdQuery(pokemonId);

  const formatStatName = (statName: string): string => {
    return statName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatPokemonName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };



  const handleError = () => {
    if (error) {
      Alert.alert(
        'Error',
        'Failed to load Pokemon details. Please check your internet connection and try again.',
        [
          { text: 'Retry', onPress: () => refetch() },
          { text: 'Go Back', onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  React.useEffect(() => {
    handleError();
  }, [error]);

  React.useEffect(() => {
    navigation.setOptions({
      title: formatPokemonName(pokemonName),
      headerTitleStyle: {
        fontWeight: '600',
      },
    });
  }, [navigation, pokemonName]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading Pokemon details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !pokemon) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Failed to load Pokemon details</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Pokemon Image and Basic Info */}
          <View style={styles.imageSection}>
            <Image
              source={{
                uri: pokemon.sprites.front_default || 
                     `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
              }}
              style={styles.pokemonImage}
              defaultSource={require('../../../assets/images/icon.png')}
            />
            <Text style={styles.pokemonName}>{formatPokemonName(pokemon.name)}</Text>
            <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
          </View>

          {/* Types */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Types</Text>
            <View style={styles.typesContainer}>
              {pokemon.types.map((typeInfo) => (
                <View
                  key={typeInfo.type.name}
                  style={[
                    styles.typeChip,
                    { backgroundColor: getPokemonTypeColor(typeInfo.type.name) },
                  ]}
                >
                  <Text style={styles.typeText}>
                    {formatPokemonName(typeInfo.type.name)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Basic Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.basicInfoContainer}>
              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoLabel}>Height</Text>
                <Text style={styles.basicInfoValue}>{(pokemon.height / 10).toFixed(1)} m</Text>
              </View>
              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoLabel}>Weight</Text>
                <Text style={styles.basicInfoValue}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
              </View>
              <View style={styles.basicInfoItem}>
                <Text style={styles.basicInfoLabel}>Base Experience</Text>
                <Text style={styles.basicInfoValue}>{pokemon.base_experience}</Text>
              </View>
            </View>
          </View>

          {/* Abilities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Abilities</Text>
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((abilityInfo) => (
                <View key={abilityInfo.ability.name} style={styles.abilityChip}>
                  <Text style={styles.abilityText}>
                    {formatStatName(abilityInfo.ability.name)}
                    {abilityInfo.is_hidden && ' (Hidden)'}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stats</Text>
            <View style={styles.statsContainer}>
              {pokemon.stats.map((statInfo) => (
                <View key={statInfo.stat.name} style={styles.statItem}>
                  <Text style={styles.statName}>
                    {formatStatName(statInfo.stat.name)}
                  </Text>
                  <View style={styles.statBarContainer}>
                    <View
                      style={[
                        styles.statBar,
                        {
                          width: `${Math.min((statInfo.base_stat / 200) * 100, 100)}%`,
                          backgroundColor: getStatBarColor(statInfo.base_stat),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.statValue}>{statInfo.base_stat}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PokemonDetails;