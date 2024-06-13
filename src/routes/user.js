import { Router } from "express";
import { get } from "../services/user.service.js";

const router = Router()

router.get('/', get)

export default router