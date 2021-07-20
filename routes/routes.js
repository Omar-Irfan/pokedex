const pokedexRoutes = require('./pokedex')

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });
  pokedexRoutes(app, fs)

}

module.exports = appRouter;