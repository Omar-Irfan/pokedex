const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());

app.use(express.static("pokemonData"))

const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});