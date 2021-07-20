const pokedexRoutes = (app, fs) => {
  // variables
  const dataPath = './data/pokedex.json';

  // READ
  app.get('/pokedex', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
};

module.exports = pokedexRoutes;