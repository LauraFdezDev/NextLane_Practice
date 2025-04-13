"use client";
import { useState } from "react";
import { Spin } from 'antd';
import PokemonList from "../components/PokemonList";
import PokemonDetails from "../components/PokemonDetails";
import usePokedex from "../hooks/usePokedex";
import useSearchPokemon from "../hooks/useSearchPokemon";
import useClickCounters from "../hooks/useClickCounters";

export default function Home() {
  const [page, setPage] = useState(0);

  const { pokedex, isErrorPokedex, isLoadingPokedex } = usePokedex(page);

  const [pokemonURL, setPokemonURL] = useState(null);
  const { pokemon, isErrorPokemon, isLoadingPokemon } = useSearchPokemon(pokemonURL);

  const { clicks, click, reset } = useClickCounters();

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  return (
      <div className="box">
        <div className="row sidebar">
          <h3>Lista de Pokémon</h3>
          <br/>
          <PokemonList 
            isErrorPokedex={isErrorPokedex} 
            isLoadingPokedex={isLoadingPokedex} 
            pokedex={pokedex} 
            page={page} 
            nextPage={nextPage} 
            previousPage={previousPage} 
            setPokemonURL={setPokemonURL} 
            reset={reset} />
        </div>
        <div className="row content">
          <PokemonDetails 
            isErrorPokemon={isErrorPokemon} 
            isLoadingPokemon={isLoadingPokemon} 
            pokemon={pokemon} 
            clicks={clicks} 
            click={click}/>
        </div>
      </div>
  );
}
