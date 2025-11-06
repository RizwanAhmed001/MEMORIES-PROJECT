import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;

    if(!token){
      return res.status(401).json({success: false, message: "Not Authorize To View This Page"})
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY)
    console.log(decode)

    req.user = decode;
    next();


  } catch (error) {
    return res.status(500).json({success: false, message: "Something Went Wrong!"})
  }
}