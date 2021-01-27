import 'dotenv/config'
import 'reflect-metadata'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import routes from './routes'

mongoose
  .connect(process.env.MONGODB_URI!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(initialize)

function initialize() {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(cors())

  app.use(routes)

  const PORT = process.env.PORT || 3333
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}
