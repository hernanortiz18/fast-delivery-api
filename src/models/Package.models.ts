import { Model, DataTypes, IntegerDataType, DateDataType } from "sequelize"
import db from "../config/db"

interface PackageAttributes {
    address: string,
    clientName: string,
    weight: IntegerDataType,
    deliveryDate: DateDataType,
    status: string,
    DeliveryDriver?: number
}

class Package extends Model<PackageAttributes> {
}

Package.init(
    {
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Pending", "On Course", "Delivered", "Free"),
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: "package"
    }
)

export default Package