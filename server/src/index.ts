import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { router as apiRouter } from "./api";
import { errorHandler, notFoundError } from "./middlewares/errorHandlers";
import morgan from "morgan";
import helmet from "helmet";
const app: Express = express();
const PORT = process.env.PORT || 3000;

//register middleware

app.use(
  cors({
    origin: process.env.origin || "http://localhost:5173",
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());
app.use(morgan("dev"));

//catch all to send endpoints to the API router
app.use("/api", apiRouter);

//error handling endware that ultimately handles
//and send errors back to requester

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server start on port:${PORT}`);
});
