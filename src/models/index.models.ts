import User from './User.models'
import Package from './Package.models'

Package.belongsTo(User, { foreignKey: 'driver_id', as: 'driver' })
User.hasMany(Package, { foreignKey: 'driver_id' })

export default { User, Package }
