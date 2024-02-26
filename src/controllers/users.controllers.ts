import { Request, Response } from 'express'
import { generateToken } from '../config/tokens.config'
import User from '../models/User.models'

export const UsersController = {
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
    User.findByPk(id)
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
  }

}
