import User from '../models/User.models'

export const createAdminUser = async (): Promise<void> => {
  try {
    await User.create({
      email: 'admin@fastdelivery.com',
      password: 'fastdelivery',
      name: 'Admin',
      lastName: 'User',
      status: 'Free',
      role: 'Admin'
    })
    console.log('Admin created successfully.')
  } catch (error) {
    console.error('Error creating admin user: ', error)
  }
}
