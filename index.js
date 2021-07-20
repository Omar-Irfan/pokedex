// load up the express framework and body-parser helper
const express = require('express');


// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
app.use(express.static("pokemonData"))

// configure our express instance with some body-parser settings
// including handling JSON data

// this is where we'll handle our various routes from
// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});