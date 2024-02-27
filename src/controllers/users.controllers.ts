import { Request, Response } from 'express'
import { generateToken } from '../config/tokens.config'
import User from '../models/User.models'

export const UsersController = {

  register: async (req: Request, res: Response): Promise<Response> => {
    try {
      const {email, password, name, lastName, status, role } = req.body;

      const existingUser = await User.findOne({where: {email}});
      if(existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
      const newUser = await User.create({
        email,
        password,
        name,
        lastName,
        status,
        role
      });
      return res.status(201).json(newUser)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ha ocurrido un error al registrar el usuario' });
    }
  },

  login (req: Request, res: Response): Response {
    const { email } = req.body
    const payload = {
      email
    }
    const token = generateToken(payload)
    res.cookie('token', token, {
      sameSite: 'none',
      httpOnly: true,
      secure: true
    })
    return res.status(200).send(payload)
  },

  getUserById: (req: Request, res: Response) => {
    const { id } = req.params
    User.findOne({where: {id}})
      .then(user => {
        if (user === null) {
          res.status(404).send('No se ha encontrado el usuario')
        } else {
          res.status(200).send(user)
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).send('Ha ocurrido un error en la búsqueda de usuario')
      })
  },

  getAllUsers: (_req: Request, res: Response) => {
    User.findAll()
      .then(users => {
        if (users.length === 0) {
          res.status(404).send('No se han encontrado usuarios')
        } else {
          res.status(200).send(users)
        }
      })
      .catch(error => {
        console.error(error)
        res.status(500).send('Ha ocurrido un error en la solicitud')
      })
  },
  deleteUserById: (req: Request, res: Response) => {
    const { id } = req.params
    User.findByPk(id)
      .then(async user => {
        if (user === null) {
          res.status(404).send('No se ha encontrado el usuario a eliminar')
        } else {
          User.destroy({ where: { id } })
            .then(() => {
              res.status(200).send('Usuario eliminado correctamente')
            })
            .catch(error => {
              console.error(error)
              res.status(500).send('Ha ocurrido un error al eliminar el usuario.')
            })
        }
      })
      .catch(error => {
        console.error(error)
        res.status(500).send('Ha ocurrido un error al realizar la operación.')
      })
  },

  updateUserById : (req: Request, res: Response)=> {
    const {name,lastName} = req.body
    const {id} = req.params
    User.update({name,lastName,},{ where: {id}, returning: true })
    .then(([_rows, user])=>res.status(201).send(user))
    .catch((error)=> console.log(error))

  },

  passRecovery : (req: Request, res: Response) => {
    const {password} = req.body
    const {id} = req.params
    User.update({password},{where:{id}, returning: true})
    .then(([_rows, user])=>res.status(201).send(user))
    .catch((error)=>console.log(error))

  }

}
