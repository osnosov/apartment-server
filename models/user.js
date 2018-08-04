const db = require('../db');

async function getAllUser() {
  const users = await db('users')
    .select()
    .then();
  return users;
}

async function getUser(criteria) {
  const user = await db('users')
    .select()
    .where(criteria)
    .first()
    .then();
  return user;
}

module.exports = { getAllUser, getUser };
