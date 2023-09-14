import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!("authorization" in req.headers)) {
    return res
      .status(401)
      .json({ status: "error", msg: "No authorization token found" });
  }
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET as Secret);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "unauthorised" });
    }
  } else {
    return res.status(401).json({ status: "error", msg: "forbidden" });
  }
};
export { auth };
