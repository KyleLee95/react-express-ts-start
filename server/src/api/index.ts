import { Router } from "express";
import { router as userRouter } from "./users";
interface ResponseError extends Error {
  status?: number;
}
export const router = Router();

router.use("/users", userRouter);

//404 in the event the endpoint doesn't exist
router.use((req, res, next) => {
  const error: ResponseError = new Error("Not Found");
  error.status = 404;
  next(error);
});
