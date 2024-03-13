import { Request, Response } from 'express'
import Package from '../models/Package.models'
import { driverStatusChanger } from '../utils/index.utils'

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
    } else {
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
  },
  getPackagesByDriver: (req: Request, res: Response) => {
    const driverId = req.params.id
    Package.findAll({
      where: {
        driver_id: driverId
      }
    })
      .then((packageList) => {
        if (packageList.length > 0) {
          res.status(200).send(packageList)
        } else {
          res.status(404).send('Driver has no assigned packages')
        }
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('There was an error finding the packages')
      })
  },
  createPackage: (req: Request, res: Response) => {
    const { address, client_name, weight, delivery_date } = req.body
    Package.create({
      address,
      client_name,
      weight,
      delivery_date,
      status: 'Free',
      driver_id: null
    }).then((createdPackage) => {
      res.status(201).send(createdPackage)
    })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Ha ocurrido un error al crear el paquete.')
      })
  },
  startDelivery: (req: Request, res: Response) => {
    const idArray = req.body.idArray as Number[]
    const driverId = Number(req.body.tokenInfo.id)
    const promises: Array<Promise<[affectedCount: number]> | Promise<void>> = []
    promises.push(driverStatusChanger(driverId, 'Pending'))
    idArray.forEach(id => {
      promises.push(Package.update(
        {
          driver_id: driverId,
          status: 'Pending'
        }, {
        where: {
          id
        }
      }
      ))
    })
    Promise.all(promises)
      .then(() => {
        res.status(200).send('Packages updated')
      })
      .catch((err: Error) => {
        if (err.message === 'Driver could not be found') {
          res.status(404).send(err.message)
        } else {
          console.error(err)
          res.status(500).send('Error when trying to update packages')
        }
      })
  },
  changeStatus: (req: Request, res: Response) => {
    const packageId = Number(req.params.id)
    const { newStatus } = req.body
    const driverId = Number(req.body.tokenInfo.id)
    if (!['Pending', 'On Course', 'Delivered', 'Free'].includes(newStatus)) {
      res.status(400).send('Estado no válido')
    } else {
      Package.update({ status: newStatus }, { where: { id: packageId } })
        .then(async () => {
          return await driverStatusChanger(driverId, newStatus, packageId)
        })
        .then(() => {
          res.status(204).send('Package updated')
        })
        .catch((err: Error) => {
          console.error(err)
          res.status(500).send('Error when trying to update packages')
        })
    }
  },
  deletePackage: (req: Request, res: Response) => {
    const packageId = req.params.id
    Package.findByPk(packageId)
      .then((pack) => {
        if (pack != null) {
          pack.destroy()
            .then(() => {
              res.status(202).send('Package successfully deleted')
            })
            .catch((err) => {
              console.error(err)
              res.status(500).send('Error when trying to delete package')
            })
        } else {
          res.status(404).send('Package not found')
        }
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error when trying to find package')
      })
  }
}
