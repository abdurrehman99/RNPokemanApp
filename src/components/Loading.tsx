import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#3B82F6" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
});

export default Loading;