import type { Request, Response } from "express";
import LoginModel from "../models/loginModel.ts";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response) => {
  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All Fields Are Mandatory" })
    }

    const emailExist = await LoginModel.findOne({ email })

    if (emailExist) {
      return res.status(409).json({ success: false, message: "Email Already Exist" })
    }

    const hashedPassword = await hash(password, 10);

    if(!hashedPassword){
      return res.status(404).json({success: false, message: "Error While Hashing Password"})
    }

    const user = new LoginModel({name, email, password: hashedPassword});
    await user.save();

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);

    return res.status(201).json({success: true, message: "New User Added",user, token})


  } catch (error) {
    return res.status(500).json({success: false, message: "Something Went Wrong!"})
  }
}

export const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All Fields Are Mandatory" })
    }

    const user = await LoginModel.findOne({ email })

    if (!user) {
      return res.status(409).json({ success: false, message: "Email Does'nt Exist" })
    }

    const comparePassword = await compare(password, user.password)

    if(!comparePassword){
      return res.status(400).json({succes: false, message: "Invalid Credentials"})
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);

    return res.status(201).json({success: true, message: "User Login", user, token})

  } catch (error) {
    return res.status(500).json({success: false, message: "Something Went Wrong!"})
  }
}