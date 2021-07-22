import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Pokemon from "./Pokemon"
import './extraCss.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '55%',
    marginBottom: '3%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    backgroundColor: 'gold',
    color:'DarkBlue',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(type, typeName, theme) {
  return {
    fontWeight:
      typeName.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function PokemonList() {
  const classes = useStyles();
  const theme = useTheme();
  const [typeName, setTypeName] = useState([])
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/types.json",{
    })
    .then((res) => {
      setTypes(res.data.map(type => type.english))

    })},[])

  const handleChange = (event) => {
    setTypeName(event.target.value)

  };

  useEffect(() => {
    getData()
  }, [offset, typeName])


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
    let filteredData = res.data.filter(pokemon => pokemon.type.toString().includes((typeName).toString()))
    const slice = filteredData.slice(offset , offset + perPage)
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
      setPageCount(Math.ceil(filteredData.length / perPage))
    }



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(Math.ceil(selectedPage * perPage))
  };

  return (
    <div>
    <div className="titleSearch">
      <img className="title" src="https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"></img>
      <FormControl className={classes.formControl}>
        <InputLabel
        id="demo-mutiple-chip-label">Types</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={typeName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type} style={getStyles(type, typeName, theme)}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     </div>

      <div className="PokeList">
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
    </div>
  );

}