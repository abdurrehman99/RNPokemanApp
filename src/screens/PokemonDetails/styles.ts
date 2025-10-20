import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F1F5F9',
    marginBottom: 16,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
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
    color: '#1E293B',
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
    color: '#FFFFFF',
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
    color: '#64748B',
  },
  basicInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityChip: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  abilityText: {
    color: '#475569',
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
    color: '#64748B',
    textTransform: 'capitalize',
  },
  statBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
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
    color: '#1E293B',
    alignSelf: 'flex-end',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});