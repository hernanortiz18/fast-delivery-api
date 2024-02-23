import express from "express";
import { PackagesControllers } from "../controllers/packages.controllers";
const router = express.Router();
import { validateAuth } from "../middlewares/validateAuth.middlewares";

router.get("/", validateAuth, PackagesControllers.getAllPackages);
router.get("single/:id", validateAuth, PackagesControllers.getPackageById)
router.get("status/:status", validateAuth, PackagesControllers.getPackagesByStatus)