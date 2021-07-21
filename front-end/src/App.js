import React from "react"
import PokemonList from "./PokemonList"
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState([

  ])
  useEffect(() => {
    axios.get("http://localhost:3001/pokedex.json",{
    })
    .then((res) => {
      setState(res.data)
    })},[])

  return (
<PokemonList data={state}/>
  );
}

export default App;
