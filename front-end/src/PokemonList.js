import React from "react";
import Pokemon from "./Pokemon"

export default function PokemonList(props) {
  const { data } = props
  const parsedPokemon =  data.map((pokemon) => (
    <Pokemon
    id={pokemon.id}
    name={pokemon.name.english}
    types={pokemon.type.toString().split(",").join(", ")}
    HP={pokemon.base.HP}
    Attack={pokemon.base.Attack}
    Defense={pokemon.base.Defense}
    Speed={pokemon.base.Speed}
    />
  ))
  return(
   <ul>{parsedPokemon}</ul>
  )

}