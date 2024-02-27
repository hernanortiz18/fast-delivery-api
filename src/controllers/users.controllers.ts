import { Request, Response } from 'express'
import { generateToken } from '../config/tokens.config'
import User from "../models/User.models"

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

  getUserById: async (req: Request, res:Response) => {
    const {id} = req.params
    try {
      const user = await User.findByPk(id);
      if (!user) res.status(404).send("No se ha encontrado el usuario")
      if (user) res.status(200).send(user)
    } catch (error) {
      console.log(error)
      res.status(500).send("Ha ocurrido un error en la búsqueda de usuario")
    }
  },

  getAllUsers: async (_req:Request, res: Response) => {
    try {
      const users = await User.findAll()
      if (!users) res.status(404).send("No se han encontrado usuarios")
      if (users) res.status(200).send(users)
    } catch (error) {
      console.error(error)
      res.status(500).send("Ha ocurrido un error en la solicitud")
    }
  },
deleteUserById: async (req: Request, res:Response) => {
  const {id} = req.params
  try{
    const user = await User.findByPk(id)
    if(!user) res.status(404).send("No se ha encontrado el usuario a eliminar")
    await User.destroy({where:{ id }})
    
  } catch (error) {
    console.error(error)
    res.status(500).send("Ha ocurrido un error al realizar la operación.")
  }
}


}
