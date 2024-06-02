import { Request, Response } from "express";
import { saveContact } from "../usecases/save_contact.usecase";

export async function identify(req: Request, res: Response): Promise<void> {
  try {
    const response = await saveContact({
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
      email: req.body.email ? req.body.email : null
    })
  
    res.status(response.statusCode).json(response.data)
  } catch (error) {
    res.status(500).json({
      message: "internal server error"
    })
  }
}