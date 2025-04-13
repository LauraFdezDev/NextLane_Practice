import { useLocalStorage } from "../app/localStorage";
import { useQuery } from "@tanstack/react-query";

export default function useSearchPokemon(pokemonURL) {
    const { setItem, getItem } = useLocalStorage('pokemon');
    
    const {
        data: pokemon,
        isError: isErrorPokemon,
        isLoading: isLoadingPokemon,
      } = useQuery({
        queryKey: ["pokemon", {pokemonURL}],
        queryFn: async () => {
          if (pokemonURL) {
            const response = await fetch(pokemonURL);
            const json = await response.json();
            await setItem(json);
            return json;
          } else return JSON.parse(getItem());
        } 
      })

    return { pokemon, isErrorPokemon, isLoadingPokemon }
}