import "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // or your own type, e.g. { id: string; email: string }
    }
  }
}
