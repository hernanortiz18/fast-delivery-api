import { Request, Response } from 'express'
import Package from '../models/Package.models'

export const PackagesControllers = {
  getAllPackages: (req: Request, res: Response): void => {
    Package.findAll()
      .then(packages => {
        if (packages.length === 0) {
          res.status(404).send('No se ha encontrado ningun paquete')
        } else {
          res.status(200).json(packages)
        }
      })
      .catch(error => {
        console.error(error)
        res.status(500).send('Ha ocurrido un error en la búsqueda de los paquetes')
      })
  },

  getPackageById: (req: Request, res: Response) => {
    const packageId = req.params.id
    Package.findByPk(packageId)
      .then(individualPackage => {
        if (individualPackage !== null) {
          res.status(200).json(individualPackage)
        } else {
          res.status(404).send('No se ha encontrado su paquete')
        }
      })
      .catch(error => {
        console.error(error)
        res.status(500).send('Ha ocurrido un error en la búsqueda del paquete')
      })
  },
  getPackagesByStatus: (req: Request, res: Response) => {
    const { status } = req.params
    if (!['Pending', 'On Course', 'Delivered', 'Free'].includes(status)) {
      res.status(400).send('Estado no válido')
    }
    Package.findAll({ where: { status } })
      .then(packagesByStatus => {
        if (packagesByStatus.length === 0) {
          res.status(404).send('No se han encontrado sus paquetes')
        } else {
          res.status(200).json(packagesByStatus)
        }
      })
      .catch(error => {
        console.error(error)
        res.status(500).send('Ha ocurrido un error en la búsqueda de los paquetes')
      })
  }
}
