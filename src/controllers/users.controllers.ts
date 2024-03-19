import { Request, Response } from 'express'
import { generateToken } from '../config/tokens.config'
import User from '../models/User.models'
import { sendVerifyEmail } from '../utils/index.utils'
import { format } from 'date-fns'

export const UsersController = {


  
  register: (req: Request, res: Response): void => {
    const { email, password, name, last_name } = req.body
    const actualDate = format(new Date(), 'dd/MM/yy')

    User.findOne({ where: { email } })
      .then(existingUser => {
        if (existingUser != null) {
          res.status(400).json({ message: 'El usuario ya existe' })
        } else {
          const token = generateToken({
            id: 0, email, name, last_name, role: 'Driver'
          })
          User.create({
            email,
            password,
            name,
            last_name,
            status: 'Unvalidated',
            role: 'Driver',
            salt: '',
            token,
            last_activity: actualDate
          })
            .then(newUser => {
              sendVerifyEmail(token, email)
                .then(() => {
                  res.status(201).json(newUser)
                })
                .catch(error => {
                  console.error(error)
                  res.status(500).json({ message: 'Ha ocurrido un error al enviar el mail de registro' })
                })
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
  verifyEmail: (req: Request, res: Response): void => {
    const { token } = req.params
    if (token == null) res.status(400).send('No token found')
    User.update({
      token: null,
      status: 'Free'
    }, { where: { token }, returning: true })
      .then((user) => {
        if (user == null) res.status(401).send('No user ofund with that token')
        res.status(200).send('User verified')
      })
      .catch((err) => {
        console.error(err)
        res.status(500).json({ message: 'Ha ocurrido un error al verificar el usuario' })
      })
  },

  login: (req: Request, res: Response): void => {
    const { email, password } = req.body
    const actualDate = format(new Date(), 'dd/MM/yy')

    User.findOne({ where: { email } })
      .then(async (user) => {
        if (user == null) {
          return res.status(401).send('User not found')
        } else {
          const status = user.getDataValue('status')
          const lastActivity = user.getDataValue('last_activity')
          return await user.validatePassword(password).then(async (isValid) => {
            if (!isValid) {
              return res.status(401).send('Wrong password')
            } else if (status === 'Unvalidated') {
              return res.status(401).send('User needs to validate email')
            } else if (status === 'Disabled' && lastActivity === actualDate) {
              return res.status(401).send('User is disabled')
            } else {
              const userValues = user.get()
              const payload = {
                id: userValues.id,
                name: userValues.name,
                role: userValues.role,
                last_name: userValues.last_name,
                email: userValues.email
              }
              const token = generateToken(payload)
              res.cookie('token', token, {
                sameSite: 'none',
                httpOnly: true,
                secure: true
              })
              if (status === 'Disabled') {
                return await User.update({ status: 'Free', last_activity: actualDate }, { where: { email } })
                  .then(() => {
                    return res.status(200).send(payload)
                  })
                  .catch((error) => {
                    console.error('Error when trying to update user:', error)
                    return res.status(500).send('Error when trying to update user')
                  })
              }
              return await User.update({ last_activity: actualDate }, { where: { email } })
                .then(() => {
                  return res.status(200).send(payload)
                })
                .catch((error) => {
                  console.error('Error when trying to update user:', error)
                  return res.status(500).send('Error when trying to update user')
                })
            }
          }
          ).catch((error) => {
            console.error('Error when trying to login user:', error)
            return res.status(500).send('Internal Server Error')
          })
        }
      })
      .catch((error) => {
        console.error('Error when trying to login user:', error)
        return res.status(500).send('Internal Server Error')
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
    const { id } = req.params
    const actualDate = format(new Date(), 'dd/MM/yy')
    User.update({ ...req.body, last_activity: actualDate }, { where: { id }, returning: true })
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
