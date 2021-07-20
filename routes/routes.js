const pokedexRoutes = require('./pokedex')
const itemsRoutes = require('./items')
const movesRoutes = require('./moves')

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });
  pokedexRoutes(app, fs)
  itemsRoutes(app, fs)
  movesRoutes(app, fs)
}

module.exports = appRouter;