import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mediaRouter from "./media/index.js"
import { badRequestErrorHandler, notFoundErrorHandler, forbiddenErrorHandler, genericServerErrorHandler } from "./errors.js"

const server = express()
const port = process.env.PORT

const loggerMiddleware = (req, res, next) => {
    console.log(`Request method ${req.method} -+++++- Request URL ${req.url}`)
    next()
  }

  const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]
  const corsOptions = {
      origin: function (origin, next) {
          if(!origin || whitelist.indexOf(origin) !== -1) {
              next(null, true) 
          } else {
              next(new Error(`origin ${origin} is not allowed!!`))
          }
      }
  }
server.use(loggerMiddleware)
server.use(cors(corsOptions)) 
server.use(express.json())
server.use("/movies", mediaRouter)

server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

console.table(listEndpoints(server))
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
  