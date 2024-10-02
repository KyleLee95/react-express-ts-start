import express, { Express, Request, Response, NextFunction } from "express";
import { router as apiRouter } from "./api";
import cors from "cors";
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use("/api", apiRouter);

app.use(
  cors({
    origin: process.env.origin || "http://localhost:5173",
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, () => {
  console.log(`Server start on port:${PORT}`);
});
