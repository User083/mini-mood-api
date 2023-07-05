const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
// const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use(router)

const PORT = 8000

// server.use(jsonServer.rewriter(routes))

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})


  server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});