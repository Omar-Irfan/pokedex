import React from 'react';
import ReactDOM from 'react-dom';
import './extraCss.css';
import PokemonList from "./PokemonList"


ReactDOM.render(
  <React.StrictMode>
    <PokemonList/>
  </React.StrictMode>,
  document.getElementById('root')
);
