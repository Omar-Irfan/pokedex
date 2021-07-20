const movesRoutes = (app, fs) => {
  // variables
  const dataPath = './data/moves.json';

  // READ
  app.get('/moves', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
};

module.exports = movesRoutes;