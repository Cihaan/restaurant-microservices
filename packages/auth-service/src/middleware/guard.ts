import { NextFunction, Request, Response } from 'express';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log('AUTH GUARD');
  if (req.isAuthenticated()) {
    // Extend session if less than 1 day remaining
    if (req.session.cookie.maxAge < 24 * 60 * 60 * 1000) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // Extend to 1 week
    }
    console.log('AUTH GUARD PASSED');
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log('ADMIN GUARD');
  if (req.isAuthenticated() && req.user?.role === 'admin') {
    console.log('ADMIN GUARD PASSED');
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
