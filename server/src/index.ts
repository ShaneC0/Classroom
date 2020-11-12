import { createConnection } from "typeorm";
import cors from "cors";
import morgan from "morgan";

import apiRouter from "./api/api.router";
import express from "express";

const app: express.Application = express();

app.use(morgan('tiny'))

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api/v1", apiRouter);

//add not found handler

app.use((err, req, res, next) => {
  res.json({ message: err.message, stack: err.stack });
  next(err);
});

app.listen(process.env.PORT, async () => {
  const connection = await createConnection();

  if (connection.isConnected) {
    console.log("Connected to Postgres");
  }

  console.log(`Express server listening on http://localhost:${process.env.PORT}/`);
});
