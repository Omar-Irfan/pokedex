import React from "react";
import Pokemon from "./Pokemon"
import './extraCss.css';

export default function PokemonList(props) {

  const idFormater = function(id) {
    if (id <= 99 && id >= 10){
      id = '0' + id
    }
    else if (id <= 9){
      id = '00' + id
    }
    return id
  }

  const { data } = props
  const parsedPokemon =  data.map((pokemon) => (
    <Pokemon
    id={idFormater(pokemon.id)}
    name={pokemon.name.english}
    types={pokemon.type.toString().split(",").join(", ")}
    HP={pokemon.base.HP}
    Attack={pokemon.base.Attack}
    Defense={pokemon.base.Defense}
    Speed={pokemon.base.Speed}
    />
  ))
  return(
    <ul className="PokeList">{parsedPokemon}</ul>
  )

}