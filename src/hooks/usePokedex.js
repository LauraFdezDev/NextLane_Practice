import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "../app/localStorage";

const BASE_URL = "https://pokeapi.co/api/v2";
const pageCount = 10;

export default function usePokedex(page) {
    const { setItem } = useLocalStorage('pokedex');
    const {
        data: pokedex,
        isError: isErrorPokedex,
        isLoading : isLoadingPokedex,
      } = useQuery({
        queryKey: ["pokedex", {page}],
        queryFn: async () => {
          const response = await fetch(`${BASE_URL}/pokemon?limit=${pageCount}&offset=${page * 20}`);
          const json = await response.json();
          await setItem(json);
          return json;
        } 
      })
    return { pokedex, isErrorPokedex, isLoadingPokedex };
}