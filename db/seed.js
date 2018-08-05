const bcrypt = require('bcrypt');
const db = require('../db');

async function seed() {
  await db('users').insert([
    {
      id: 1,
      email: 'admin@demo.me',
      username: 'Admin',
      password: bcrypt.hashSync('test', 10),
      firstName: 'Admin',
      lastName: 'Admin',
      phoneNumber: '0500000000',
      role: 'admin',
    },
    {
      id: 2,
      email: 'manager@demo.me',
      username: 'Manager',
      firstName: 'Manager',
      lastName: 'Manager',
      phoneNumber: '0501111111',
      password: bcrypt.hashSync('test', 10),
      role: 'manager',
    },
  ]);

  await db('customer').insert([
    {
      id: 1,
      firstName: 'Customer1',
      lastName: 'Customer1',
      phoneNumber: '0503333333',
      email: 'customer1@customer.me',
    },
    {
      id: 2,
      firstName: 'Customer2',
      lastName: 'Customer2',
      phoneNumber: '0504444444',
      email: 'customer1@customer.me',
    },
  ]);

  await db.destroy();
}

seed();
