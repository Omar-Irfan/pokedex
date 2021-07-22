import React from 'react';
import ReactDOM from 'react-dom';
import './extraCss.css';
import PokemonList from "./PokemonList"

//Index file loads the PokemonList component which renders most of the app

ReactDOM.render(
  <React.StrictMode>
    <PokemonList/>
  </React.StrictMode>,
  document.getElementById('root')
);
