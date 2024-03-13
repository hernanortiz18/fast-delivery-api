import User from '../models/User.models'
import Package from '../models/Package.models'
import transporter from '../config/mailer.config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { format } from 'date-fns'

const appMail = process.env.EMAIL_NODEMAILER as string

export const createAdminUser = async (): Promise<void> => {
  try {
    const actualDate = format(new Date(), 'dd/MM/yy')
    const userCount = await User.count()
    if (userCount === 0) {
      await User.create({
        email: 'admin@fastdelivery.com',
        password: 'fastdelivery',
        name: 'Admin',
        last_name: 'User',
        status: 'Free',
        role: 'Admin',
        last_activity: actualDate
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

export const sendVerifyEmail = async (token: string, userEmail: string): Promise<SMTPTransport.SentMessageInfo> => {
  const confirmURL = `http://localhost:3000/confirm-email/${token}`
  return await transporter.sendMail({
    from: `"Confirmación de correo electrónico" <${appMail}>`,
    to: userEmail,
    subject: 'Confirmación de correo ✔',
    html: `<b>Por favor haz click en el siguiente link, o copia el enlace y pegalo en tu navegador para confirmar tu correo:</b><a href="${confirmURL}">${confirmURL}</a>`
  })
}
