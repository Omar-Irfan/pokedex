const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());

app.use(express.static("pokemonData")) //Express static middleware posts all the data in the pokemonData folder directly to the server

app.get('/', function (req, res) { //When you make a get request it sends this message to the server on how to access the data
  res.send(
    `HOW TO ACCESS DATA ON THIS SERVER

    Pokemon Data: http://localhost:3001/pokedex.json

    Types Data: http://localhost:3001/types.json

    Thumbnails:http://localhost:3001/thumbnails/{POKEDEXID#}.png

    Sprites:http://localhost:3001/sprites/{POKEDEXID#}MS.png

    Where {POKEDEXID#} is a 3 Digit ID number for each Pokemon
  `)
})

const server = app.listen(3001, () => { //Message to check if server is running correctly
  console.log('listening on port %s...', server.address().port);
});