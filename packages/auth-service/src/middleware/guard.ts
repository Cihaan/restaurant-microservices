import { NextFunction, Request, Response } from 'express';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    // Extend session if less than 1 day remaining
    if (req.session.cookie.maxAge < 24 * 60 * 60 * 1000) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // Extend to 1 week
    }
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
