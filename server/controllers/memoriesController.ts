import LoginModel from "../models/loginModel.ts";
import MemoriesModel from "../models/memoriesModel.ts";
import type { Response, Request } from "express";

export const createMemory = async (req: Request, res: Response) => {

  try {

    const { creator, title, message, tags, image } = req.body;

    if (!creator || !title || !message || !tags || !image) {
      return res.status(400).json({ success: false, message: "All Fields Are Mandatory" })
    }

    const newMemory = new MemoriesModel({ creator, title, message, tags, image });

    await newMemory.save();

    return res.status(201).json({ success: true, message: "New Memory Created!" })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went Wrong!" })
  }
}

export const getMemories = async (req: Request, res: Response) => {
  try {

    const { id } = req.user;
    console.log("------", id);

    const userExist = await LoginModel.findById(id);

    if (!userExist) {
      return res.status(400).json({ success: false, message: "Not Authorize" })
    }

    const allMemories = await MemoriesModel.find({});

    return res.status(200).json({ success: true, message: "All Data Received", allMemories })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went Wrong!" })
  }
}

export const getMemoryById = async (req: Request, res: Response) => {
  try {

    if (true) {
      const { id } = req.user;
      console.log("------", id);

      const userExist = await LoginModel.findById(id);

      if (!userExist) {
        return res.status(400).json({ success: false, message: "Not Authorize" })
      }
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Please provide Memory Id!" })
    }

    const data = await MemoriesModel.findById(id)

    if (!data) {
      return res.status(404).json({ success: false, message: "No Such Memory Exist" })
    }

    return res.status(200).json({ success: true, message: "Single User Data", data })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went Wrong!" })
  }
}

export const updateMemory = async (req: Request, res: Response) => {
  try {

    if (true) {
      const { id } = req.user;
      console.log("------", id);

      const userExist = await LoginModel.findById(id);

      if (!userExist) {
        return res.status(400).json({ success: false, message: "Not Authorize" })
      }
    }

    const { id } = req.params;
    const { creator, title, message, tags, image } = req.body;

    if (!creator || !title || !message || !tags || !image) {
      return res.status(400).json({ success: false, message: "All Fields Are Mandatory" })
    }

    if (!id) {
      return res.status(400).json({ success: false, message: "Please provide Memory Id!" })
    }

    const updatedData = { creator, title, message, tags, image }
    const updatedMemory = await MemoriesModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })

    if (!updatedMemory) {
      return res.status(404).json({ success: false, message: "Memory not found." });
    }

    return res.status(200).json({ success: true, message: "Memory Updated", data: updatedMemory })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went Wrong!" })
  }
}

export const deleteMemory = async (req: Request, res: Response) => {
  try {

    if (true) {
      const { id } = req.user;
      console.log("------", id);

      const userExist = await LoginModel.findById(id);

      if (!userExist) {
        return res.status(400).json({ success: false, message: "Not Authorize" })
      }
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Please provide Memory Id!" })
    }

    const deletedData = await MemoriesModel.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ success: false, message: "No Such Memory Exist" })
    }

    return res.status(200).json({ success: true, message: "Memory Deleted", data: deleteMemory })


  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Went Wrong!" })
  }
}