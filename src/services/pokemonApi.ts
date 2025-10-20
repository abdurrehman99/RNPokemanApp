import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { Pokemon, PokemonListResponse } from "../types/pokemon";

const baseUrl =
  Constants.expoConfig?.extra?.POKEMON_API_BASE_URL ||
  process.env.EXPO_PUBLIC_POKEMON_API_BASE_URL ||
  "https://pokeapi.co/api/v2";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Pokemon", "PokemonList"],
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      PokemonListResponse,
      { limit?: number; offset?: number }
    >({
      query: ({ limit = 20, offset = 0 } = {}) => ({
        url: `/pokemon`,
        params: { limit, offset },
      }),
      providesTags: ["PokemonList"],
      transformResponse: (response: PokemonListResponse) => ({
        ...response,
        results: response.results.map((pokemon) => ({
          ...pokemon,
          id: parseInt(pokemon.url.split("/").filter(Boolean).pop() || "0", 10),
        })),
      }),
    }),

    getPokemonById: builder.query<Pokemon, number>({
      query: (id) => `/pokemon/${id}`,
      providesTags: (result, error, id) => [{ type: "Pokemon", id }],
    }),

    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `/pokemon/${name.toLowerCase()}`,
      providesTags: (result, error, name) => [{ type: "Pokemon", id: name }],
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonByIdQuery,
  useGetPokemonByNameQuery,
  useLazyGetPokemonByIdQuery,
  useLazyGetPokemonByNameQuery,
} = pokemonApi;
