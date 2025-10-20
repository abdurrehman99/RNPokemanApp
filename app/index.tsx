import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '../src/components/Loading';
import PokemonDetails from '../src/screens/PokemonDetails';
import PokemonList from '../src/screens/PokemonList';
import { persistor, store } from '../src/store/store';
import { RootStackParamList } from '../src/types/pokemon';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <NavigationContainer>
          <Stack.Navigator
            initialRouteName="PokemonList"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: '#1E293B',
              headerTitleStyle: {
                fontWeight: '600',
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="PokemonList"
              component={PokemonList}
              options={{
                title: 'Pokemon',
                headerLargeTitle: true,
              }}
            />
            <Stack.Screen
              name="PokemonDetails"
              component={PokemonDetails}
              options={{
                headerBackTitle: '',
              }}
            />
          </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
