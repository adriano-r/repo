// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

// modificação para buscar por Id
server.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = db.usuarios.find((user) => user.Id === id);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});


server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
