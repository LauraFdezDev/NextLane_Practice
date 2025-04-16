import {useEffect, useState} from "react";
import { useLocalStorage } from "../app/localStorage";

export default function useClickCounters(pokemon) {
    const { getItem, setItem } = useLocalStorage('clicks');
    const clickList = JSON.parse(getItem());
    const [clicks, setClicks] = useState(clickList.filter(e => e.id === pokemon?.id).click || 0)

    const click = () => {
        if (Array.isArray(clickList)) {
            var pokemonsBeenClicked = clickList.find(e => e.id === pokemon.id);
            if (pokemonsBeenClicked) {
                var updatedClickList = clickList.map(clickedPokemon => {
                    if (clickedPokemon.id === pokemon.id) {
                    setClicks(clickedPokemon.click + 1);
                    return { ...clickedPokemon, click: clickedPokemon.click + 1 };
                    } else {
                    return clickedPokemon;
                    }
               });
               setItem(updatedClickList);
            } else {
                setClicks(1);
                setItem([...clickList, { id: pokemon.id, click: 1}])
            }
        } else {
            setClicks(1);
            setItem([
                { id: pokemon.id, click: 1},
            ])
        }
    }

    useEffect(() => {
        setClicks(clickList.find(e => e.id === pokemon?.id)?.click || 0);
    }, [pokemon])

    return { clicks, click}
}