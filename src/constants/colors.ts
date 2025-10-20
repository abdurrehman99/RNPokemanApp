// Central color palette for the Pokemon App
export const Colors = {
  // Primary Colors
  primary: '#3B82F6',      // Blue - primary action color
  primaryLight: '#60A5FA', // Lighter blue
  primaryDark: '#2563EB',  // Darker blue
  
  // Background Colors
  background: '#F8FAFC',   // Light gray background
  surface: '#FFFFFF',      // White surface/card background
  surfaceSecondary: '#F1F5F9', // Light gray surface
  
  // Text Colors
  textPrimary: '#1E293B',  // Dark text
  textSecondary: '#64748B', // Gray text
  textTertiary: '#475569',  // Medium gray text
  textInverse: '#FFFFFF',   // White text
  
  // Status Colors
  success: '#10B981',      // Green - success/positive
  error: '#EF4444',        // Red - error/negative
  warning: '#F59E0B',      // Orange - warning
  
  // UI Elements
  border: '#E2E8F0',       // Light gray border
  shadow: '#000',          // Black shadow
  transparent: 'transparent',
  
  // Pokemon Type Colors
  pokemonTypes: {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    default: '#68A090', // Default fallback color
  },
} as const;

// Export individual color groups for easier access
export const { pokemonTypes } = Colors;

// Helper function to get Pokemon type color
export const getPokemonTypeColor = (type: string): string => {
  return Colors.pokemonTypes[type as keyof typeof Colors.pokemonTypes] || Colors.pokemonTypes.default;
};

// Helper function to get stat bar color based on value
export const getStatBarColor = (statValue: number): string => {
  if (statValue > 100) return Colors.success;
  if (statValue > 50) return Colors.warning;
  return Colors.error;
};