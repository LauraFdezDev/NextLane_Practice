import { Card, Spin } from 'antd';
import useCapitalize from "../hooks/useCapitalize";

const { Meta } = Card;

const PokemonDetails = ({pokemon, clicks, click, isErrorPokemon, isLoadingPokemon}) => {

    return (
        isErrorPokemon ? 
            <div>Hubo un error renderizando la información del Pokémon. Refresca la página para volver a intentarlo.</div>
            : isLoadingPokemon ?<Spin size="large" /> :
                pokemon !== null ?
                <Card
                    hoverable
                    className="pokemonCard"
                    cover={<img onClick={click} alt="example" src={pokemon?.sprites?.front_default} />}>
                    <Meta title={useCapitalize(pokemon?.name)} description={`Number of clicks: ${clicks}`} />
                </Card> : <div>Select a Pokémon from the list!</div>)
}

export default PokemonDetails;