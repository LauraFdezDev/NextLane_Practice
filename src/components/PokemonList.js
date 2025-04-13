import React, { useState } from 'react';
import { Menu, Button, Input, Spin } from 'antd';
import useCapitalize from "../hooks/useCapitalize";
const { Search } = Input;

export default function PokemonList ({pokedex, page, nextPage, previousPage, setPokemonURL, reset, isErrorPokedex, isLoadingPokedex}) {

    const items = pokedex?.results?.map((i, idx) => (
        {key: idx + 1, label: useCapitalize(i.name), url: i.url}
    ));

    const selectPokemon = (key) => {
        setPokemonURL(items[key - 1]?.url);
        reset();
    }

    const searchPokemon = (e) => {
        setPokemonURL(`https://pokeapi.co/api/v2/pokemon/${e}`);
        reset();
    }
    
    return (
        isErrorPokedex ? 
            <div>Hubo un error renderizando la lista de pokémon. Refresca la página para volver a intentarlo.</div>
            :  isLoadingPokedex ? <Spin size="large" /> :
            <div>
                <Menu
                    onClick={(e) => selectPokemon(e.key)}
                    style={{ width: 256 }}
                    mode="inline"
                    items={items}
                />
                <br />
                <span>Página {page + 1}</span>
                <div className='paginationBox'>
                    <div className='paginationButton'>{page > 0 && <Button onClick={previousPage}>Página anterior</Button>}</div>
                    <div className='paginationButton'><Button onClick={nextPage}>Siguiente página</Button> </div>
                </div>
                <Search style={{marginTop: 30}} placeholder="Buscar pokémon..." onSearch={searchPokemon} />
            </div>
         
    );
};