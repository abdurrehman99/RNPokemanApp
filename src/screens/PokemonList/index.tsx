import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from '../../components/PokemonCard';
import { useGetPokemonListQuery } from '../../services/pokemonApi';
import { PokemonListItem, RootStackParamList } from '../../types/pokemon';
import { styles } from './styles';

type PokemonListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PokemonList'
>;

const PokemonList: React.FC = () => {
  const navigation = useNavigation<PokemonListNavigationProp>();

  // Pagination state
  const [currentOffset, setCurrentOffset] = React.useState(0);
  const [allPokemon, setAllPokemon] = React.useState<PokemonListItem[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [sessionId] = React.useState(() => Date.now()); // Unique session ID
  const limit = 20;

  // API query - using currentOffset to trigger new requests
  const {
    data,
    error,
    isLoading,
    isFetching,
  } = useGetPokemonListQuery({ limit, offset: currentOffset });

  // Effect to accumulate Pokemon data from API responses
  React.useEffect(() => {
    if (data?.results) {
      if (currentOffset === 0) {
        // First load - replace all data
        setAllPokemon(data.results);
      } else {
        // Subsequent loads - append new data only if it's not already in the list
        setAllPokemon(prevPokemon => {
          const existingUrls = new Set(prevPokemon.map(p => p.url));
          const newPokemon = data.results.filter(p => !existingUrls.has(p.url));
          
          if (newPokemon.length > 0) {
            return [...prevPokemon, ...newPokemon];
          }
          return prevPokemon;
        });
      }
      setHasNextPage(!!data.next);
      setIsLoadingMore(false);
    }
  }, [data, currentOffset, sessionId]);

  // Handle error
  React.useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        'Failed to load Pokemon list. Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
    }
  }, [error]);

  const handlePokemonPress = (pokemonName: string, pokemonId: number) => {
    navigation.navigate('PokemonDetails', {
      pokemonName,
      pokemonId,
    });
  };

  const loadMore = () => {
    if (!isFetching && !isLoadingMore && hasNextPage && data?.next) {
      setIsLoadingMore(true);
      setCurrentOffset(prevOffset => prevOffset + limit);
    }
  };

  const handleRetry = () => {
    setCurrentOffset(0);
    setAllPokemon([]);
    setHasNextPage(true);
    setIsLoadingMore(false);
  };


  const renderPokemonCard = ({ item }: { item: PokemonListItem }) => (
    <PokemonCard pokemon={item} onPress={handlePokemonPress} />
  );

  const renderFooter = () => {
    if (isFetching || isLoadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#3B82F6" />
          <Text style={styles.loadingMoreText}>Loading more Pokemon...</Text>
        </View>
      );
    }
    
    if (!hasNextPage && allPokemon.length > 0) {
      return (
        <View style={styles.footerLoader}>
          <Text style={styles.endOfListText}>You've caught them all!</Text>
        </View>
      );
    }
    
    return null;
  };

  // Loading state for initial load
  if (isLoading && currentOffset === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading Pokemon...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state for initial load
  if (error && currentOffset === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Failed to load Pokemon</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.content}>
        <FlatList
          data={allPokemon}
          renderItem={renderPokemonCard}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          testID="pokemon-list"
          refreshing={isLoading && currentOffset === 0}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </View>
    </SafeAreaView>
  );
};

export default PokemonList;