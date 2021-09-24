import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"

const server = express()
const port = process.env.PORT

const loggerMiddleware = (req, res, next) => {
    console.log(`Request method ${req.method} -+++++- Request URL ${req.url}`)
    next()
  }
server.use(loggerMiddleware)
server.use(cors()) 
server.use(express.json())



server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
  