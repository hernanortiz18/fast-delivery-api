import User from '../models/User.models'
import Package from '../models/Package.models'

export const createAdminUser = async (): Promise<void> => {
  try {
    const userCount = await User.count()
    if (userCount === 0) {
      await User.create({
        email: 'admin@fastdelivery.com',
        password: 'fastdelivery',
        name: 'Admin',
        last_name: 'User',
        status: 'Free',
        role: 'Admin'
      })
      console.log('Admin created successfully.')
    }
  } catch (error) {
    console.error('Error creating admin user: ', error)
  }
}

export const driverStatusChanger = async (driverId: number, packageNewStatus: string, packageId?: number): Promise<[affectedCount: number]> => {
  const driver = await User.findByPk(driverId)
  const onCoursePackageCount = await Package.count({ where: { driver_id: driverId, status: 'On Course' } })
  const pendingPackageCount = await Package.count({ where: { driver_id: driverId, status: 'Pending' } })
  if (driver != null) {
    const driverStatus = driver.getDataValue('status')
    switch (packageNewStatus) {
      case 'Pending':
        if (driverStatus === 'Free') {
          return await User.update({ status: 'Inactive' }, { where: { id: driverId } })
        }
        break

      case 'On Course':
        if (driverStatus !== 'On Course') {
          return await User.update({ status: 'On Course' }, { where: { id: driverId } })
        }
        break

      case 'Delivered':
        if (onCoursePackageCount === 0 && pendingPackageCount === 0) {
          return await User.update({ status: 'Free' }, { where: { id: driverId } })
        } else if (onCoursePackageCount === 0 && pendingPackageCount > 0) {
          return await User.update({ status: 'Inactive' }, { where: { id: driverId } })
        }
        break

      case 'Free':
        await Package.update({ driver_id: null }, { where: { id: packageId } })
        if (onCoursePackageCount === 0 && pendingPackageCount === 0) {
          return await User.update({ status: 'Free' }, { where: { id: driverId } })
        } else if (onCoursePackageCount === 0 && pendingPackageCount > 0) {
          return await User.update({ status: 'Inactive' }, { where: { id: driverId } })
        }
        break
    }
    return [0]
  } else {
    throw new Error('Driver could not be found')
  }
}
