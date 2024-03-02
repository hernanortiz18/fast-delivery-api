import User from '../models/User.models'

export const createAdminUser = async (): Promise<void> => {
  try {
    const userCount = await User.count()
    if (userCount === 0) {
      await User.create({
        email: 'admin@fastdelivery.com',
        password: 'fastdelivery',
        name: 'Admin',
        lastName: 'User',
        status: 'Free',
        role: 'Admin'
      })
      console.log('Admin created successfully.')
    }
  } catch (error) {
    console.error('Error creating admin user: ', error)
  }
}
