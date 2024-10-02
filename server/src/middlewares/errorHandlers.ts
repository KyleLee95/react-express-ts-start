import { Request, Response, NextFunction } from "express";
import ErrorResponse from "src/types/ErrorResponse";
import MessageResponse from "src/types/MessageResponse";

export function notFoundError(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Could not find the url ${req.originalUrl}.`);
  res.status(404);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const resBody = {
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Something went wrong..."
        : err.stack,
  };
  console.error(err);
  console.error(err.stack);

  res.status(statusCode).json(resBody);
}
