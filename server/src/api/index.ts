import { Router } from "express";
import { router as userRouter } from "./users";
import { notFoundError } from "src/middlewares/errorHandlers";
export const router = Router();

router.use("/users", userRouter);

//404 in the event the endpoint doesn't exist
router.use(notFoundError);
