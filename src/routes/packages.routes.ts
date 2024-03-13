import express from 'express'
import { PackagesControllers } from '../controllers/packages.controllers'
import { validateAdmin, validateAuth } from '../middlewares/validateAuth.middlewares'
const router = express.Router()

router.get('/', validateAuth, PackagesControllers.getAllPackages)
/**
 * @swagger
 * /api/packages/:
 *   get:
 *     summary: Obtener todos los paquetes
 *     description: Obtiene una lista de todos los paquetes.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de paquetes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *       '401':
 *         description: No autorizado, token inválido o ausente
 *       '500':
 *         description: Error al realizar la solicitud
 */
router.get('/', validateAuth, PackagesControllers.getAllPackages)

router.get('/single/:id', validateAuth, PackagesControllers.getPackageById)
router.get('/status/:status', validateAuth, PackagesControllers.getPackagesByStatus)
router.get('/driver/:id', validateAuth, PackagesControllers.getPackagesByDriver)
router.put('/start-delivery', validateAuth, PackagesControllers.startDelivery)
router.put('/status/:id', validateAuth, PackagesControllers.changeStatus)
router.post('/', validateAdmin, PackagesControllers.createPackage)

export default router
