import { Request, Response, NextFunction } from "express";
import ErrorResponse from "src/errors/ErrorResponse";
import { ZodError } from "zod";

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
  console.error(err.stack);
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map((issue: any) => ({
      message: `${issue.path.join(".")} is ${issue.message}`,
    }));
    res.status(400).json({ message: "Invalid data", data: errorMessages });
    return;
  }

  const resBody = {
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Something went wrong..."
        : err.stack,
  };
  res.status(statusCode).json(resBody);
}
