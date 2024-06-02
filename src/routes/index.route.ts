import {  Router } from "express";
import { identify } from "../controllers/identify.controller";

export const router = Router()

router.post("/identify", identify)