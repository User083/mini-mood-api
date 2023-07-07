const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')
const corsOptions = {}
// const routes = require('./routes.json')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use(router)

server.options("/cart", cors())

const PORT = 8000

// server.use(jsonServer.rewriter(routes))

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})


