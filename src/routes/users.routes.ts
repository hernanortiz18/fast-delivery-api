import express from 'express'
import { validateAuth } from '../middlewares/validateAuth.middlewares'
import { UsersController } from '../controllers/users.controllers'

const router = express.Router()
 /**
   * @swagger
   * /api/users/register:
   *   post:
   *     summary: Crea un nuevo usuario
   *     description: Crea un nuevo usuario con la información proporcionada en el cuerpo de la solicitud.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: example@example.com
   *               password:
   *                 type: string
   *                 example: password123
   *               name:
   *                 type: string
   *                 example: John
   *               lastName:
   *                 type: string
   *                 example: Doe
   *     responses:
   *       '201':
   *         description: Usuario creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 email:
   *                   type: string
   *                 name:
   *                   type: string
   *                 lastName:
   *                   type: string
   *                 status:
   *                   type: string
   *                 role:
   *                   type: string
   *       '400':
   *         description: Error al crear el usuario
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
router.post('/register', UsersController.register)

router.post('/login', UsersController.login)
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión
 *     description: Inicia sesión con las credenciales proporcionadas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       '401':
 *         description: Credenciales inválidas
 *       '500':
 *         description: Error al realizar la solicitud
 */

router.post('/logout', UsersController.logout)
router.put('/verify-email/:token', UsersController.verifyEmail)
router.put('/forgot-password/:id', UsersController.passRecovery)
router.get('/single/:id', UsersController.getUserById)
router.delete('/:id', UsersController.deleteUserById)
router.put('/update/:id', UsersController.updateUserById)
router.get('/me', validateAuth, (req, res) => { res.sendStatus(200) })


  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Obtiene todos los usuarios
   *     description: Obtiene una lista de todos los usuarios registrados en el sistema.
   *     responses:
   *       '200':
   *         description: Lista de usuarios obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   email:
   *                     type: string
   *                   name:
   *                     type: string
   *                   lastName:
   *                     type: string
   *                   status:
   *                     type: string
   *                   role:
   *                     type: string
   *       '404':
   *         description: No se han encontrado usuarios
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       '500':
   *         description: Error al realizar la solicitud
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
router.get('/', UsersController.getAllUsers)

export default router
