import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import routes from "./api/routes.js";
import {
  errorConverterHandler,
  errorHandler,
  notFoundHandler,
} from "./middleware/errors.js";

const app = express();

dotenv.config();

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorConverterHandler);
app.use(errorHandler);

export default app;
