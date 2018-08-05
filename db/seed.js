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
      email: 'customer2@customer.me',
    },
  ]);

  await db('type').insert([
    {
      id: 1,
      name: '1 room',
    },
    {
      id: 2,
      name: '2 room',
    },
  ]);

  await db('apartment').insert([
    {
      id: 1,
      number: 456,
      floor: 4,
      type: 1,
    },
    {
      id: 2,
      number: 536,
      floor: 5,
      type: 2,
    },
    {
      id: 3,
      number: 724,
      floor: 7,
      type: 1,
    },
  ]);

  await db.destroy();
}

seed();
