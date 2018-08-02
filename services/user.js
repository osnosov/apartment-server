const db = require('../db');

async function getUsers() {
  const users = await db('users')
    .select()
    .then();
  return users;
}

module.exports = { getUsers };
