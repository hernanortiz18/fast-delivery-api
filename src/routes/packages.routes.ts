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
 
 *     responses:
 *       '200':
 *         description: Lista de paquetes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
router.delete('/single/:id', validateAdmin, PackagesControllers.deletePackage )



router.post('/', validateAdmin, PackagesControllers.createPackage)


/**
 * @swagger
 * /api/packages/:
 *   post:
 *     summary: Crear un nuevo paquete
 *     description: Crea un nuevo paquete con la información proporcionada en el cuerpo de la solicitud.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: Pasaje Magallanes 2080, Yerba Buena
 *               clientName:
 *                 type: string
 *                 example: Juan Arismendi
 *               weight:
 *                 type: string
 *                 example: '3'
 *               delivery_date:
 *                 type: string
 *                 format: date
 *                 example: '2024-05-06'
 *     responses:
 *       '201':
 *         description: Paquete creado exitosamente
 *         content:
 *           application/json:
 *          
 *       '401':
 *         description: No autorizado, token inválido o ausente
 *       '500':
 *         description: Error al realizar la solicitud
 */
router.post('/', validateAdmin, PackagesControllers.createPackage)

export default router
