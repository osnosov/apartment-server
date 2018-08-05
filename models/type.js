const db = require('../db');

async function createType(data) {
  return db('type').insert(data);
}

async function getType(criteria) {
  const type = await db('type')
    .select()
    .where(criteria)
    .first();
  return type;
}

async function updateType({ criteria, data }) {
  return db('type')
    .where(criteria)
    .update(data);
}

async function destroyType(criteria) {
  await db('type')
    .where(criteria)
    .del();
}

module.exports = { createType, getType, updateType, destroyType };
