const db = require('../db');

async function getAllUser() {
  const users = await db('users').select();
  return users;
}

async function getUser(criteria) {
  const user = await db('users')
    .select()
    .where(criteria)
    .first();
  return user;
}

async function createUser(user) {
  const id = await db('users').insert(user);
  return id;
}

async function updateUser({ criteria, data }) {
  return db('users')
    .where(criteria)
    .update(data);
}

async function destroyUser(criteria) {
  return db('users')
    .where(criteria)
    .delete();
}

module.exports = { getAllUser, getUser, createUser, updateUser, destroyUser };
