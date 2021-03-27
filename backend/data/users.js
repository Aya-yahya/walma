import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Aya Yahya',
    email: 'aya@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Aya',

    email: 'aya2@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
