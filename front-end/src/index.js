import React from 'react';
import ReactDOM from 'react-dom';
import './extraCss.css';
import PokemonList from "./PokemonList"
import DropList from "./DropList"


ReactDOM.render(
  <React.StrictMode>
    <DropList/>
  </React.StrictMode>,
  document.getElementById('root')
);
