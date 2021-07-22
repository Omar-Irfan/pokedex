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

const useStyles = makeStyles((theme) => ({ //Sets the styling condiitions for the type selection bar and chips
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
    backgroundColor: '#d9d9d9',
    backgroundImage: 'linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%)',
    color:'DarkBlue',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48; //Sets styling for the menu props which are used to build the form
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(type, typeName, theme) { //Sets font settings for the chips
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
  const [typeName, setTypeName] = useState([]) //State settings for selectiom of type in the type selection bar
  const [offset, setOffset] = useState(0); //State settings for pagination offset for each page
  const [data, setData] = useState([]); //State settings for each individual Pokemon
  const [perPage] = useState(10);
  //Sets state for how many Pokemon to be displayed per page
  const [pageCount, setPageCount] = useState(0)
  //Sets state for the page count based on how many pokemon are retriieved for each type
  const [types, setTypes] = useState([])
  //Sets state for get request to get types from server

  useEffect(() => {
    axios.get("http://localhost:3001/types.json",{
    }) //axios get request to server to get a list of all valid pokemon types
    .then((res) => {
      setTypes(res.data.map(type => type.english))
      //Filters type data to only return array of english names
    })},[])

  const handleChange = (event) => {
    setTypeName(event.target.value)
    //Sets the type everytime a new type is selected in the type selection bar
  };

  useEffect(() => {
    getData() //runs the getData functions everytime the typeName array changes
  }, [offset, typeName])


  const idFormater = function(id) { //Formats Pokedex ID numbers so they always have 3 digits
    if (id <= 99 && id >= 10){
      id = '0' + id
    }
    else if (id <= 9){
      id = '00' + id
    }
    return id
  }

  const getData = async() => {
    const res = await axios.get('http://localhost:3001/pokedex.json') //async function to grab all the display data for each individual pokemon
    let filteredData = res.data.filter(pokemon => pokemon.type.toString().includes((typeName).toString())) //Filters data from JSON to only show them the pokemon with the correct type configuration based on the selected type
    const slice = filteredData.slice(offset , offset + perPage) //slices the data to show only the pokemon for each page
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
      //above function takes the data points from the sliced data and sends them as props to the Pokemon component
      setData(parsedPokemon) //sets parsedPokemon as data to use in the return function in order to render
      setPageCount(Math.ceil(filteredData.length / perPage)) //Sets the page count by dividing the # of Pokemon by the # of Pokemon that can appear on one page
    }



  const handlePageClick = (e) => {
    const selectedPage = e.selected; //Everytime a page is clicked the offset value is updated inorder to show the right pokemon for that page
    setOffset(Math.ceil(selectedPage * perPage))
  };


  //Below renders the title image, the type selection bar, the individual Pokemon as well as the page navigation bar
  return (
    <div>
    <div className="titleSearch">
      <img className="title" src="https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"></img>
      <FormControl className={classes.formControl}>
        <InputLabel>Types</InputLabel>
        <Select
          multiple
          value={typeName}
          onChange={handleChange}
          input={<Input/>}
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