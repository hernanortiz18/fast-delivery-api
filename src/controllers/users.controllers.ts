import { Request, Response } from 'express'
import { generateToken } from '../config/tokens.config'
import User from '../models/User.models'

export const UsersController = {


  
  register: (req: Request, res: Response): void => {
    const { email, password, name, lastName } = req.body

    User.findOne({ where: { email } })
      .then(existingUser => {
        if (existingUser != null) {
          res.status(400).json({ message: 'El usuario ya existe' })
        } else {
          User.create({
            email,
            password,
            name,
            last_name: lastName,
            status: 'Free',
            role: 'Driver',
            salt: ''
          })
            .then(newUser => {
              res.status(201).json(newUser)
            })
            .catch(error => {
              console.error(error)
              res.status(500).json({ message: 'Ha ocurrido un error al registrar el usuario' })
            })
        }
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el usuario' })
      })
  },

  login (req: Request, res: Response): void {
    const { email, password } = req.body

    User.findOne({ where: { email } })
      .then((user) => {
        if (user == null) {
          res.sendStatus(401)
        } else {
          user.validatePassword(password).then((isValid) => {
            if (!isValid) {
              res.sendStatus(401)
            } else {
              const userValues = user.get()
              const payload = {
                id: userValues.id,
                name: userValues.name,
                role: userValues.role,
                lastName: userValues.last_name,
                email: userValues.email
              }
              const token = generateToken(payload)
              res.cookie('token', token, {
                sameSite: 'none',
                httpOnly: true,
                secure: true
              })
              res.status(200).send(payload)
            }
          }).catch((error) => {
            console.error('Error when trying to login user:', error)
            res.status(500).send('Internal Server Error')
          })
        }
      })
      .catch((error) => {
        console.error('Error when trying to login user:', error)
        res.status(500).send('Internal Server Error')
      })
  },

  logout: (_req: Request, res: Response) => {
    res.clearCookie('token')
    res.sendStatus(204)
    console.log('token del usuario borrado')
  },

  getUserById: (req: Request, res: Response) => {
    const { id } = req.params
    User.findOne({ where: { id } })
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

  updateUserById: (req: Request, res: Response) => {
    const { name, lastName } = req.body
    const { id } = req.params
    User.update({ name, last_name: lastName }, { where: { id }, returning: true })
      .then(([_rows, user]) => res.status(201).send(user))
      .catch((error) => console.log(error))
  },

  passRecovery: (req: Request, res: Response) => {
    const { password } = req.body
    const { id } = req.params
    User.update({ password }, { where: { id }, returning: true })
      .then(([_rows, user]) => res.status(201).send(user))
      .catch((error) => console.log(error))
  }

}
