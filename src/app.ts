import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// NOTE:Import routes here...

// NOTE: Declare routes here...

app.get("/test", (req: Request, res: Response) => {
  return res.json({
    message: "Working fine",
  });
});

// NOTE:ERROR handling...
// @ts-ignore
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  return res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };
