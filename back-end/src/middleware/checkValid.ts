import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export { validation };
