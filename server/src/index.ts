import { createConnection } from "typeorm";
import cors from "cors";
import morgan from "morgan";

import apiRouter from "./api/api.router";
import {checkTokenSetUser} from "./api/util/middleware"

import express from "express";

const app: express.Application = express();

app.use(morgan('tiny'))

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api/v1", checkTokenSetUser, apiRouter);

//add not found handler

function notFound(req, res, next) {
  res.status(404)
  next(new Error(`Not found - ${req.originalUrl}`))
}

function errorHandler(err, req, res, next) {
  res.status(500)
  res.json({
    message: err.message,
    stack: err.stack,
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, async () => {
  const connection = await createConnection();

  if (connection.isConnected) {
    console.log("Connected to Postgres");
  }

  console.log(`Express server listening on http://localhost:${process.env.PORT}/`);
});
