const db = require('../db');

async function createType(data) {
  const id = await db('type').insert(data);
  return id;
}

async function getAllType() {
  const types = await db('type').select();
  return types;
}

async function getType(criteria) {
  const type = await db('type')
    .select()
    .where(criteria)
    .first();
  return type;
}

async function updateType({ criteria, data }) {
  const status = await db('type')
    .where(criteria)
    .update(data);
  return status;
}

async function destroyType(criteria) {
  const status = await db('type')
    .where(criteria)
    .del();
  return status;
}

module.exports = { createType, getAllType, getType, updateType, destroyType };
