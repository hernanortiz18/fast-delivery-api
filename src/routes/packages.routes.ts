import express from 'express'
import { PackagesControllers } from '../controllers/packages.controllers'
import { validateAuth } from '../middlewares/validateAuth.middlewares'
const router = express.Router()

router.get('/', validateAuth, PackagesControllers.getAllPackages)
router.get('single/:id', validateAuth, PackagesControllers.getPackageById)
router.get('status/:status', validateAuth, PackagesControllers.getPackagesByStatus)
// router.post('/', validateAdmin, PackagesControllers.createPackage)
