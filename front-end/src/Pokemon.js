import React from "react"

function Pokemon() {
  const testPokemon = {
    "id": 1,
    "name": {
      "english": "Bulbasaur",
      "japanese": "フシギダネ",
      "chinese": "妙蛙种子",
      "french": "Bulbizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "base": {
      "HP": 45,
      "Attack": 49,
      "Defense": 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      "Speed": 45
    }
  }
  return (
    <li className="PokemonCard">
      <h2>ID: {testPokemon.id}</h2>
      <h2>Name: {testPokemon.name.english}</h2>
      <h2>Type: {testPokemon.type}</h2>
      <h2>HP: {testPokemon.base.HP}</h2>
      <h2>ATTACK: {testPokemon.base.Attack}</h2>
      <h2>DEFENSE: {testPokemon.base.Defense}</h2>
      <h2>SPEED: {testPokemon.base.Speed}</h2>

    </li>
  )
}

export default Pokemon;
