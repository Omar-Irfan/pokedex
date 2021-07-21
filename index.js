const express = require('express');

const app = express();

app.use(express.static("pokemonData"))

const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});