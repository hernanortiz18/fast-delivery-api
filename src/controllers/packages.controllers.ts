import { Request, Response } from "express";
import Package from "../models/Package.models";

export const PackagesControllers = {
  getAllPackages: async (req: Request, res: Response) => {
    try {
      const packages = await Package.findAll();
      if (packages) res.status(200).json(packages);
      if (!packages) res.status(404).send("No se ha encontrado ningun paquete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Ha ocurrido un error en la búsqueda de los paquetes");
    }
  },
  getPackageById: async (req: Request, res: Response) => {
    const packageId = req.params.id;
    try {
      const individualPackage = await Package.findByPk(packageId);
      if (individualPackage) res.status(200).json(individualPackage);
      if (!individualPackage)
        res.status(404).send("No se ha encontrado su paquete");
    } catch (error) {
      console.error(error);
      res.status(500).send("Ha ocurrido un error en la búsqueda del paquete");
    }
  },
  getPackagesByStatus: async (req: Request, res: Response) => {
    const { status } = req.params;
    if (!["Pending", "On Course", "Delivered", "Free"].includes(status)) {
      res.status(404).send("Estado no válido");
    }
    try {
      const packagesByStstus = await Package.findAll({ where: { status: status } });
      if (packagesByStstus) res.status(200).json(packagesByStstus);
      if (!packagesByStstus)
        res.status(404).send("No se han encontrado sus paquetes");
    } catch (error) {
      console.error(error);
      res.status(500).send("Ha ocurrido un error en la búsqueda de los paquetes");
    }
  },
};
