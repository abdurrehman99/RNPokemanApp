import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Colors.surface,
    marginBottom: 16,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 16,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    color: Colors.textInverse,
    fontSize: 14,
    fontWeight: '600',
  },
  basicInfoContainer: {
    gap: 12,
  },
  basicInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  basicInfoLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  basicInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityChip: {
    backgroundColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  abilityText: {
    color: Colors.textTertiary,
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    gap: 16,
  },
  statItem: {
    gap: 8,
  },
  statName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  statBarContainer: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    alignSelf: 'flex-end',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.textInverse,
    fontSize: 16,
    fontWeight: '600',
  },
});