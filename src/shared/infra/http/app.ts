import "reflect-metadata"
import "dotenv/config"

import * as cors from "cors"
import * as express from "express"
import "express-async-errors"

import "@shared/container"

const app = express()

app.use(express.json())

const allowedOrigins = "*"

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}

app.use(cors(options))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

export { app }
