import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Pokemon from "./Pokemon"
import './extraCss.css';

export default function PokemonList() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)

  const idFormater = function(id) {
    if (id <= 99 && id >= 10){
      id = '0' + id
    }
    else if (id <= 9){
      id = '00' + id
    }
    return id
  }

  const getData = async() => {
    const res = await axios.get('http://localhost:3001/pokedex.json')
    const data = res.data;
    const slice = data.slice(offset , offset + perPage)
    const parsedPokemon =  slice.map((pokemon) => (
      <Pokemon
      key={pokemon.id}
      id={idFormater(pokemon.id)}
      name={pokemon.name.english}
      types={pokemon.type.toString().split(",").join(", ")}
      HP={pokemon.base.HP}
      Attack={pokemon.base.Attack}
      Defense={pokemon.base.Defense}
      Speed={pokemon.base.Speed}
      />
      ))
      setData(parsedPokemon)
      setPageCount(Math.ceil(data.length / perPage))
    }

  useEffect(() => {
    getData()
  }, [offset])

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage))
  };

  return (
    <div className="PokeList">
      <img className="title" src="https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"></img>
      {data}
       <ReactPaginate
                    previousLabel={"◄"}
                    nextLabel={"►"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );

}