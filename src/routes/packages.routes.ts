import express from 'express'
import { PackagesControllers } from '../controllers/packages.controllers'
import { validateAdmin, validateAuth } from '../middlewares/validateAuth.middlewares'
const router = express.Router()

router.get('/', validateAuth, PackagesControllers.getAllPackages)
router.get('/single/:id', validateAuth, PackagesControllers.getPackageById)
router.get('/status/:status', validateAuth, PackagesControllers.getPackagesByStatus)
router.get('/driver/:id', validateAuth, PackagesControllers.getPackagesByDriver)
router.put('/start-delivery', validateAuth, PackagesControllers.startDelivery)
router.put('/status/:id', validateAuth, PackagesControllers.changeStatus)
router.post('/', validateAdmin, PackagesControllers.createPackage)

export default router
