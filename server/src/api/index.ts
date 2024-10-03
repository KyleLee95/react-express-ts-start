import { Router } from "express";
import { router as userRouter } from "./routes/users";
import { notFoundError } from "src/middlewares/errorHandlers";
export const router = Router();

router.use("/users", userRouter);

router.use(notFoundError);
