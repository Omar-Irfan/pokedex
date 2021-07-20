const itemsRoutes = (app, fs) => {
  // variables
  const dataPath = './data/items.json';

  // READ
  app.get('/items', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
};

module.exports = itemsRoutes;